// adapted from https://github.com/GoogleChromeLabs/ui-element-samples/tree/gh-pages/infinite-scroller


import { DxUpdate, Snapshot } from './dx'
const inf = Number.NEGATIVE_INFINITY

function rotate<T>(a: T[],  n: number ) {
    a.unshift.apply( a, a.splice( n, a.length ) );
    return a;
  }

// index is given to builder to build the dom. inf indicates nto as
class Item<T> {
    constructor(public node: HTMLElement ) { }
    // on an update we can scan this to 
    data: T | null = null
    index = inf
    height = 0
    width = 0
    top = 0

    get active(): boolean { return this.index != inf };

    get isTombstone() { return !!this.data}
}

// index is the top visible item, offset is how far scroll off the top it is (0 is flush to top)
class Anchor {
    index = 0
    offset = 0
}

interface Props<T> {
    container: HTMLElement,
    snapshot: Snapshot<T>,
    // builder takes a T and creates dom from it.
    builder: (x: T, old: HTMLElement) => void,
    // tombstones are placeholders since we don't try to keep everything in ram
    tombstone: (old: HTMLElement) => void,


    // provide a callback to get notified of updates to scroll or data
    // data update is going to change scroll anyway, so having both seems meh.
    onUpdate: () => void
}

// wraps around a dom element; portrays a Snapshot stream.
// to be wrapped by react with useEffect.
export class Scroller<T>  {
    RUNWAY_ITEMS = 50
    RUNWAY_ITEMS_OPPOSITE = 10  // Number of items to instantiate beyond current view in the opposite direction.
    SCROLL_RUNWAY = 2000// The number of pixels of additional length to allow scrolling to.
    ANIMATION_DURATION_MS = 200 // The animation interval (in ms) for fading in content from tombstones.

    // these should only be on our runway. doesn't need to start at 0.
    // when we get a snapshot update we should diff the T's to see if we can reuse the dom we have created.
    rendered_start_ = 0
    rendered_: Item<T>[] = [];

    anchorItem: Anchor = { index: 0, offset: 0 };

    scrollRunwayEnd_ = 0
    anchorScrollTop = 0; // this is in pixels
    tombstoneSize_ = 0;
    tombstoneWidth_ = 0;
    tombstones_: HTMLElement[] = [];
    unusedNodes: HTMLElement[] = [];


    scrollRunway_ = document.createElement('div');   // Create an element to force the scroller to allow scrolling to a certainpoint.

    // surma's assumed we were starting from the beginning, but we are not assuming that here.
    // we do assume that we know the count of things. we want to keep two "pages". we run loads asynchronously.
    // for top-k search we might not know exactly how many items are in the snapshot. when we get the last page, it may get bigger, but it can get bigger anyway.
    
   // loadedItems_ = 0;
   // requestInProgress_ = false;

    // snapshot was updated, also our listener on the snapshot
    _update() {
        // when the snapshot has changed, our anchor might no longer exist.
        // we might want to allow the user to continue to view their snapshot indefinitely?
        // at some point the snapshot is too expensive to maintain (phone in a drawer)

        // 
        this.props.onUpdate()
    }

    close() {
        this.props.snapshot.removeListener(this._update)
    }
    get scroller_() { return this.props.container }

    // when we create a div it should be display none and absolute and a child of the scroller
    // tombstone.style.position = 'absolute'
    // this.scroller_.appendChild(tombstone)
    div() : HTMLElement {
        const r = document.createElement('div')as HTMLElement
        this.scroller_.append(r)
        r.style.position = 'absolute'
        r.style.display = 'none'
        return r
    }

    tombstone_ : HTMLElement
    constructor(public props: Props<T>) {
        this.props.snapshot.addListener(this._update)
        this.scroller_.addEventListener('scroll', () => this.onScroll_());
        window.addEventListener('resize', () => this.onResize_());
        this.scrollRunway_.textContent = ' ';
        this.scrollRunway_.style.position = 'absolute';
        this.scrollRunway_.style.height = '1px';
        this.scrollRunway_.style.width = '1px';
        this.scrollRunway_.style.transition = 'transform 0.2s';
        this.scroller_.appendChild(this.scrollRunway_);
        
        this.tombstone_ = this.div()
        // for debug, only start here.
       // this.onResize_();
    }
    onResize_() {
        // this just measures the size of a tombstone, then it discards what it knows about item 
        // either the first or last item should always be a tombstone
      
        this.tombstone_.style.display = 'block'
        this.tombstoneSize_ = this.tombstone_.offsetHeight
        this.tombstoneWidth_ = this.tombstone_.offsetWidth
        this.tombstone_.style.display = 'none'

        // Reset the cached size of items in the scroller as they may no longer be
        // correct after the item content undergoes layout.
        for (var i = 0; i < this.rendered_.length; i++) {
            this.rendered_[i].height = this.rendered_[i].width = 0
        }
        this.onScroll_()
    }


    onScroll_() {   
        //Calculates the item that should be anchored after scrolling by delta 
        const calculateAnchoredItem = (initialAnchor: Anchor, delta: number): Anchor => {
            if (delta == 0)
                return initialAnchor;
            delta += initialAnchor.offset;
            var i = initialAnchor.index;
            var tombstones = 0;
            if (delta < 0) {
                while (delta < 0 && i > 0 && this.rendered_[i - 1].height) {
                    delta += this.rendered_[i - 1].height;
                    i--;
                }
                tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneSize_));
            } else {
                while (delta > 0 && i < this.rendered_.length && this.rendered_[i].height && this.rendered_[i].height < delta) {
                    delta -= this.rendered_[i].height;
                    i++;
                }
                if (i >= this.rendered_.length || !this.rendered_[i].height)
                    tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneSize_);
            }
            i += tombstones;
            delta -= tombstones * this.tombstoneSize_;
            return {
                index: i,
                offset: delta,
            };
        }

        var delta = this.scroller_.scrollTop - this.anchorScrollTop;
        if (this.scroller_.scrollTop == 0) {
            // Special case, if we get to very top, always scroll to top.
            // this should probably trigger a pullToRefresh? but pull should be on the
            // bottom for chat.
            this.anchorItem = { index: 0, offset: 0 };
        } else {
            this.anchorItem = calculateAnchoredItem(this.anchorItem, delta);
        }
        this.anchorScrollTop = this.scroller_.scrollTop;
        var lastScreenItem = calculateAnchoredItem(this.anchorItem, this.scroller_.offsetHeight);

        // first and last are the items that we want rendered in the runway.
        // we need to move 
        let first = 0;
        let last = 0;
        // sets the range of items which should be attached and attaches those items.
        if (delta < 0) {
            first = this.anchorItem.index - this.RUNWAY_ITEMS
            last =  lastScreenItem.index + this.RUNWAY_ITEMS_OPPOSITE      
        } else {
            first = this.anchorItem.index - this.RUNWAY_ITEMS_OPPOSITE
            last = lastScreenItem.index + this.RUNWAY_ITEMS  
        }
        first = Math.max(0, first)
        last = Math.min(this.props.snapshot.length, last)

        // Attaches content to the scroller and updates the scroll position if necessary.
        // Collect nodes which will no longer be rendered for reuse.
        // TODO: Limit this based on the change in visible items rather than looping
        // over all items.

        // we need to shift the render nodes 
        const shift = first - this.rendered_start_
        this.rendered_.shift()
        var i
         for (i = 0; i < this.rendered_.length; i++) {
            
            if (i == first) {
                i = last - 1;
                continue
            }
            let n = this.rendered_[i]

            if (n.isTombstone) {
                this.tombstones_.push(n.node);
                n.node.classList.add('invisible');
            } else {
                this.unusedNodes.push(n.node);
            }
         
         }

        var tombstoneAnimations = new Map<number, [HTMLElement, number]>()
        // Create DOM nodes.
        for (i = first; i < last; i++) {
            while (this.rendered_.length <= i) {
                let o = this.props.snapshot.get(i)
                let e = this.getTemplate()
                this.props.builder(o,e)
                this.rendered_.push(new Item(e))
            }
            let n = this.rendered_[i].node
            if (n) {
                // if it's a tombstone but we have data, replace it.
                if (n.classList.contains('tombstone') &&
                    this.rendered_[i].active) {
                    // TODO: Probably best to move items on top of tombstones and fade them in instead.
                    if (this.ANIMATION_DURATION_MS) {
                        n.style.zIndex = "1"
                        tombstoneAnimations.set(i, [n, this.rendered_[i].top - this.anchorScrollTop])
                    } else {
                        n.classList.add('invisible')
                        this.tombstones_.push(n)
                    }
                    this.rendered_[i].node = null
                } else {
                    continue;
                }
            }
            const getTombstone = () => {
                var tombstone = this.tombstones_.pop()
                if (tombstone) {
                    tombstone.classList.remove('invisible')
                    tombstone.style.opacity = "1"
                    tombstone.style.transform = ''
                    tombstone.style.transition = ''
                    return tombstone;
                }
                return this.createTombstone();
            }
            let d = this.rendered_[i].data
            if (d) {
                let node = this.rendered_[i].node || this.getTemplate()
                this.props.builder(d, node as HTMLElement)
                // Maybe don't do this if it's already attached?
                node.style.position = 'absolute'
                this.rendered_[i].top = -1
                this.scroller_.appendChild(node)
                this.rendered_[i].node = node
            } else {

            }

        }



        // Get the height of all nodes which haven't been measured yet.
        for (i = first; i < last; i++) {
            // Only cache the height if we have the real contents, not a placeholder.
            let n = this.rendered_[i].node
            if (!n) continue;
            if (this.rendered_[i].active && !this.rendered_[i].height) {
                this.rendered_[i].height = n.offsetHeight;
                this.rendered_[i].width = n.offsetWidth;
            }
        }

        // Fix scroll position in case we have realized the heights of elements
        // that we didn't used to know.
        // TODO: We should only need to do this when a height of an item becomes
        // known above.
        this.anchorScrollTop = 0
        for (i = 0; i < this.anchorItem.index; i++) {
            this.anchorScrollTop += this.rendered_[i].height || this.tombstoneSize_
        }
        this.anchorScrollTop += this.anchorItem.offset

        // Position all nodes.
        var curPos = this.anchorScrollTop - this.anchorItem.offset
        i = this.anchorItem.index
        while (i > first) {
            curPos -= this.rendered_[i - 1].height || this.tombstoneSize_
            i--
        }
        while (i < first) {
            curPos += this.rendered_[i].height || this.tombstoneSize_;
            i++
        }
        // Set up initial positions for animations.
        for (let [i, anim] of tombstoneAnimations) {
            let n = this.rendered_[i].node
            if (!n) continue
            n.style.transform = 'translateY(' + (this.anchorScrollTop + anim[1]) + 'px) scale(' + (this.tombstoneWidth_ / this.rendered_[i].width) + ', ' + (this.tombstoneSize_ / this.rendered_[i].height) + ')';
            // Call offsetTop on the nodes to be animated to force them to apply current transforms.
            n.offsetTop
            anim[0].offsetTop
            n.style.transition = 'transform ' + this.ANIMATION_DURATION_MS + 'ms';
        }
        for (i = first; i < last; i++) {
            const anim: undefined | [HTMLElement, number] = tombstoneAnimations.get(i)
            if (anim) {
                anim[0].style.transition = 'transform ' + this.ANIMATION_DURATION_MS + 'ms, opacity ' + this.ANIMATION_DURATION_MS + 'ms'
                anim[0].style.transform = 'translateY(' + curPos + 'px) scale(' + (this.rendered_[i].width / this.tombstoneWidth_) + ', ' + (this.rendered_[i].height / this.tombstoneSize_) + ')'
                anim[0].style.opacity = "0"
            }
            let n = this.rendered_[i].node
            if (n && curPos != this.rendered_[i].top) {

                if (!anim)
                    n.style.transition = ''
                n.style.transform = 'translateY(' + curPos + 'px)'
            }
            this.rendered_[i].top = curPos
            curPos += this.rendered_[i].height || this.tombstoneSize_
        }

        // this monotonically increases the runway.
        this.scrollRunwayEnd_ = Math.max(this.scrollRunwayEnd_, curPos + this.SCROLL_RUNWAY)
        this.scrollRunway_.style.transform = 'translate(0, ' + this.scrollRunwayEnd_ + 'px)';
        this.scroller_.scrollTop = this.anchorScrollTop;

        if (this.ANIMATION_DURATION_MS) {
            // TODO: Should probably use transition end, but there are a lot of animations we could be listening to.
            const fn = () => {
                for (let [i, v] of tombstoneAnimations) {
                    var anim = tombstoneAnimations.get(i)
                    if (!anim) continue
                    anim[0].classList.add('invisible')
                    this.tombstones_.push(anim[0])
                    // Tombstone can be recycled now.
                }
            }            
            setTimeout(fn, this.ANIMATION_DURATION_MS)
        }


    }
}



//renderToStaticMarkup?

/*

            // Remove all unused nodes
        while (this.unusedNodes.length) {
            let u = this.unusedNodes.pop()
            if (u)
                this.scroller_.removeChild(u);
        }


    // what is the implication of changing the height?
    // if alice "likes" something, we won't scroll every's screen because of anchors.
    // this should be like resize? just set everything to unrendered?
    // 
    invalidate(begin: number, end: number, data: Item<T>[]) {
        // if this index is on screen then we need to render. otherwise 
        // there's nothing to do.
        //this.items_[i].data = data
        // we should only rerender this if its 
        // this.source_.render(data, this.items_[i].node)
        for (var i = 0; i < this.items_.length; i++) {
            this.items_[i].height = this.items_[i].width = 0;
        }
        this.onScroll_();
    }

    // loading not our job here, move to snapshot.
        let itemsNeeded = lastAttachedItem_ - this.loadedItems_;
        if (!this.requestInProgress_ && itemsNeeded > 0) {
            this.requestInProgress_ = true;
            const addContent = (items: Item<T>[]) => {
                for (var i = 0; i < items.length; i++) {
                    if (this.items_.length <= this.loadedItems_) { }//this.addItem_(items[i]);
                    //this.items_[this.loadedItems_++].data = items[i];
                }
                this.attachContent();
            }
            // let mc = await this.source_.fetch(this.loadedItems_, this.loadedItems_ + itemsNeeded)
            //addContent(mc)
            this.requestInProgress_ = false;
        }
        
    export function dom(o: JSX.Element) {
    let d = document.createElement("div")
    createRoot(d).render(o)
    return d
}

interface ScrollState<T> {
    //fixedHeight?: boolean
    data: Snapshot<T>,
    anchor: number,
    offset: number
    selection: Set<number>

    delta: UpdateRange
}
interface UpdateRange {
    from: number
    to: number
    source: number
}
*/
/*
    //Attaches content to the scroller and updates the scroll position if necessary.
    render() {
        const x: RenderInfo<T> = this.source_.data
        let unused = this.collectTombstones(x.unused)
        const o = this.source_.options
        const anchor = x.anchor - x.begin

        // maybe this returns items, unused. 
        // then we could loop through creating new elements as necessary
        // let [fdata, height, items, unused] = this.source_.data.data
        const getTombstone = () => {
            var tombstone = this.tombstones_.pop();
            if (tombstone) {
                tombstone.classList.remove('invisible');
                tombstone.style.opacity = "1";
                tombstone.style.transform = '';
                tombstone.style.transition = '';
                return tombstone;
            }
            return this.source_.createTombstone();
        }

        // render all the nodes. create an animation for each tombstone being replaced by data.
        var tombstoneAnimations = new Map<number, [HTMLElement, number]>()
        for (let i = 0; i < x.data.length; i++) {
            let nd = x.item[i].node
            let data = x.data[i]
            if (nd) {
                // if it's a tombstone but we have data, delete the tombstone.
                // if the data has changed, replace it.
                let replace = data && this.isTombstone(nd)
                if (replace) {
                    // TODO: Probably best to move items on top of tombstones and fade them in instead.
                    if (o.ANIMATION_DURATION_MS) {
                        nd.style.zIndex = "1";
                        tombstoneAnimations.set(i, [nd, x.item[i].top]) // - this.anchorScrollTo
                    } else {
                        nd.classList.add('invisible');
                        this.tombstones_.push(nd);
                    }
                    x.item[i].node = null;
                } else {
                    // here there was a node, but there is no data, so keep the tombstone.
                    continue;
                }
            }

            // if the data is valid, then render it. Otherwise render a tombstone.
            let d = x.data[i]
            if (d !== x.item[i].data) {
                var node = d ? this.source_.render(d, unused.pop()) : getTombstone();
                node.style.position = 'absolute';
                x.item[i].top = -1; // note that we don't need to set this prior to calling attach.
                this.scroller_.appendChild(node);
                x.item[i].node = node;
                x.item[i].data = d
                x.item[i].height = 0
            }
        }

        // Remove all unused nodes; why not make them invisible.
        while (unused.length) {
            let u = unused.pop()
            if (u)
                this.scroller_.removeChild(u);
        }

        // Get the height of all nodes which haven't been measured yet at once (no thrashing)
        let countMeasured = false
        for (let i = 0; i < x.data.length; i++) {
            let n = x.item[i].node
            // this checks that there is data, a node, and the height is currently 0
            // this will keep tombstones at 0 height, so we must check for that.
            if (n && x.item[i].data && !x.item[i].height) {
                x.item[i].height = n.offsetHeight;
                x.item[i].width = n.offsetWidth;
                countMeasured = true
            }
        }

        // so there is odd thing where subtracts the anchorScrollTop from top to create
        // tombstone animation, but then he recalculates anchorScrollTop and adds that back
        // to the animation top.
        // Fix scroll position in case we have realized the heights of elements
        // that we didn't used to know.
        // anchorScrollTop = sum(height of item) where item < anchor  + anchor.offset
        // note that this is all items - ugh!
        // what if they lose their size? what if we don't know their size?
        // what does this do on a resize? Maybe it doesn't matter because we 
        // are only measuring attachedContent?
        // we are setting anchorScrollTop to 0 here?

        // anchorScrollTop moves here because of the invisble things rendered above the anchor
        let anchorScrollTop = x.anchorTop + x.anchorOffset
        for (let i = 0; i < x.anchor; i++) {
            anchorScrollTop += x.item[i].height || x.tombstoneHeight
        }
        let deltaTop = anchorScrollTop - this.scroller_.scrollTop;

        // Set up initial positions for animations.
        for (let [i, anim] of tombstoneAnimations) {
            let n = x.item[i].node
            if (!n) continue

            // this need to subtract out the old anchorScollTop 
            const scale = (x.tombstoneWidth / x.item[i].width) + ', ' + (x.tombstoneHeight / x.item[i].height)
            const translateY = (deltaTop + anim[1])
            n.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')';
            n.offsetTop  // Call offsetTop on the nodes to be animated to force them to apply current transforms.
            anim[0].offsetTop
            n.style.transition = 'transform ' + o.ANIMATION_DURATION_MS + 'ms';
        }

        // this animates all the items into position
        // Position all nodes. curPos with the position of the anchor item.
        // curPos should be
        let curPos = x.anchorTop
        // we need to subtract out the invisible items over the anchor.
        let i = x.anchor
        while (i > x.begin) {
            curPos -= x.item[i - 1].height || x.tombstoneHeight
            i--
        }

        for (let i = 0; i < x.data.length; i++) {
            const anim: undefined | [HTMLElement, number] = tombstoneAnimations.get(i)
            if (anim) {
                anim[0].style.transition = 'transform ' + o.ANIMATION_DURATION_MS + 'ms, opacity ' + o.ANIMATION_DURATION_MS + 'ms'
                anim[0].style.transform = 'translateY(' + curPos + 'px) scale(' + (x.item[i].width / x.tombstoneWidth) + ', ' + (x.item[i].height / x.tombstoneHeight) + ')'
                anim[0].style.opacity = "0"
            }
            let n = x.item[i].node
            if (n && curPos != x.item[i].top) {

                if (!anim)
                    n.style.transition = ''
                n.style.transform = 'translateY(' + curPos + 'px)'
            }
            x.item[i].top = curPos
            curPos += x.item[i].height || x.tombstoneHeight
        }

        if (o.ANIMATION_DURATION_MS) {
            // TODO: Should probably use transition end, but there are a lot of animations we could be listening to.
            setTimeout(() => {
                for (let [i, v] of tombstoneAnimations) {
                    var anim = tombstoneAnimations.get(i)
                    if (!anim) continue
                    anim[0].classList.add('invisible')
                    this.tombstones_.push(anim[0])
                    // Tombstone can be recycled now.
                }
            }, o.ANIMATION_DURATION_MS)
        }

        this.scrollRunway_.style.transform = 'translate(0, ' + x.runwayLength(curPos) + 'px)';
        this.scroller_.scrollTop = anchorScrollTop;
        x.anchorTop = anchorScrollTop
    }*/