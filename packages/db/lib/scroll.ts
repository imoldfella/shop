import { DxUpdate, Snapshot } from './dx'
const inf = Number.NEGATIVE_INFINITY

export interface ScrollerProps<T> {
    container: HTMLElement,
    items?: T[]
    snapshot?: Snapshot<T>
    // builder takes a T and creates dom from it.
    builder: (x: T | null, old: HTMLElement) => void,

    // provide a callback to get notified of updates to scroll or data
    // data update is going to change scroll anyway, so having both seems meh.
    onUpdate: () => void
}

// when we move the rendered_start, we need to remember it's scrolltop



function rotate<T>(a: T[], n: number) {
    a.unshift.apply(a, a.splice(n, a.length));
    return a;
}

// index is given to builder to build the dom. inf indicates nto as
class Item<T> {
    constructor(public node: HTMLElement, public data: T | null) { }
    // on an update we can scan this to 
    height = 0
    width = 0
    top = 0
    get isTombstone() { return !!this.data }
    show(x: boolean) {
        this.node.style.display = x ? 'block' : 'none'
    }
}

// index is the top visible item, offset is how far scroll off the top it is (0 is flush to top)
class Anchor {
    index = 0
    offset = 0
}


// wraps around a dom element; portrays a Snapshot stream.
// to be wrapped by react with useEffect.
export class Scroller<T>  {

    // these should only be on our runway. doesn't need to start at 0.
    // when we get a snapshot update we should diff the T's to see if we can reuse the dom we have created.
    rendered_start_ = 0
    rendered_: Item<T>[] = [];
    tombstone_: HTMLElement
    snap_: Snapshot<T>

    anchorItem: Anchor = { index: 0, offset: 0 };

    anchorScrollTop = 0; // this is in pixels
    tombstoneHeight_ = 0;
    tombstoneWidth_ = 0;
    measuredHeight_ = 0;

    //what about instead estimating as a sample instead of by tombstone?

    scrollRunway_  // Create an element to force the scroller to allow scrolling to a certainpoint.
    _update() {
        // when the snapshot has changed, our anchor might no longer exist.
        // we might want to allow the user to continue to view their snapshot indefinitely?
        // at some point the snapshot is too expensive to maintain (phone in a drawer)

        // 
        this.props.onUpdate()
    }

    close() {
        this.snap_.removeListener(this._update)
    }
    get scroller_() { return this.props.container }

    // when we create a div it should be display none and absolute and a child of the scroller
    // tombstone.style.position = 'absolute'
    // this.scroller_.appendChild(tombstone)
    div(): HTMLElement {
        const r = document.createElement('div') as HTMLElement
        this.scroller_.append(r)
        r.style.position = 'absolute'
        r.style.display = 'block'
        return r
    }

    constructor(public props: ScrollerProps<T>) {
        this.snap_ = props.snapshot ?? Snapshot.fromArray(props.items ?? [])
        this.snap_.addListener(this._update)

        this.scroller_.addEventListener('scroll', () => this.onScroll_());
        window.addEventListener('resize', () => this.onResize_());
        this.scrollRunway_ = document.createElement('div');
        this.scrollRunway_.textContent = ' ';
        this.scrollRunway_.style.position = 'absolute';
        this.scrollRunway_.style.height = '1px';
        this.scrollRunway_.style.width = '1px';
        this.scrollRunway_.style.transition = 'transform 0.2s';
        this.scroller_.appendChild(this.scrollRunway_);

        this.tombstone_ = this.div()
        this.props.builder(null, this.tombstone_)

        this.resizeData()
        this.onResize_()
    }

    resizeData() {
        let target = Math.min(this.snap_.length, 50)

        if (target > this.rendered_.length) {
            let b = this.rendered_.length
            for (; b < target; b++) {
                let o = this.div()
                let d = this.snap_.get(this.rendered_start_ + b)
                this.props.builder(d, o)
                let i = new Item<T>(o, d)
                this.rendered_.push(i)
            }
        } else {
            // this doesn't seem right, update needs to be more complex
            this.rendered_.length = target
        }

        // second loop so all the measures are batched
        for (let o of this.rendered_)
            this.position(o)
    }

    onResize_() {
        // this measures the size of a tombstone 
        this.tombstone_.style.display = 'block'
        this.tombstoneHeight_ = this.tombstone_.offsetHeight
        this.tombstoneWidth_ = this.tombstone_.offsetWidth
        this.tombstone_.style.display = 'none'

        // Reset the cached size of items in the scroller as they may no longer be
        // correct after the item content undergoes layout.

        let curPos = this.rendered_start_ * this.tombstoneHeight_
        this.measuredHeight_ = 0
        for (let o of this.rendered_) {
            this.measure(o)
            o.top = curPos
            this.position(o)
            curPos += o.height
            this.measuredHeight_ += o.height
        }
        this.onScroll_()
    }
    position(o: Item<T>) {
        o.node.style.transform = `translateY(${o.top}px)`
    }
    measure(item: Item<T>) {
        item.height = item.node.offsetHeight
        item.width = item.node.offsetWidth
    }

    onScroll_() {
        let delta = this.scroller_.scrollTop - this.anchorScrollTop
        this.anchorScrollTop = this.scroller_.scrollTop;

        if (this.scroller_.scrollTop == 0) {
            this.anchorItem = { index: 0, offset: 0 };
        } else {
            const calculateAnchoredItem2 = (initialAnchor: Anchor, delta: number): Anchor => {
                if (delta == 0)
                    return initialAnchor;
                delta += initialAnchor.offset;
                var i = initialAnchor.index - this.rendered_start_
                var tombstones = 0;
                if (delta < 0) {
                    while (delta < 0 && i > 0) {
                        delta += this.rendered_[i - 1].height;
                        i--;
                    }
                    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight_));
                } else {
                    while (delta > 0 && i < this.rendered_.length && this.rendered_[i].height && this.rendered_[i].height < delta) {
                        delta -= this.rendered_[i].height;
                        i++;
                    }
                    if (i >= this.rendered_.length)
                        tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight_);
                }
                return {
                    index: i + this.rendered_start_ + tombstones,
                    offset: delta - tombstones * this.tombstoneHeight_,
                };
            }
            this.anchorItem = calculateAnchoredItem2(this.anchorItem, delta)
        }
        // first is lowest index to render
        let first = this.anchorItem.index - 10
        first = Math.max(0, first)
        first = Math.min(this.snap_.length - this.rendered_.length, first)

        if (first != this.rendered_start_) {
            //console.log(first)
            const shift = first - this.rendered_start_
            this.rendered_start_ = first
            let b, e
            if (Math.abs(shift) >= this.rendered_.length) {
                b = 0
                e = this.rendered_.length
            }
            else {
                // after shifting +, the last shift items are bad, after -  the first shift items are bad.        
                b = shift > 0 ? this.rendered_.length - shift : 0
                e = shift > 0 ? this.rendered_.length : - shift
                rotate(this.rendered_, shift)
            }
            let height = 0
            for (let k = b; k < e; k++) {
                const o = this.rendered_[k];
                o.data = this.snap_.get(this.rendered_start_ + k)
                this.props.builder(o.data, o.node)
                this.measuredHeight_ -= o.height
                this.measure(o)
                this.measuredHeight_ += o.height
                height += o.height
                // maybe we should have both a tombstone and a div, then we can animate between them? this would keep things from jumping around? size transition as well opacity?
            }

            let curPos
            if (b == 0) {
                if (e < this.rendered_.length) {
                    curPos = this.rendered_[e].top - height
                }
                else {
                    curPos = this.rendered_start_ * this.tombstoneHeight_
                }
            } else {
                curPos = this.rendered_[b - 1].top + this.rendered_[b - 1].height
            }

            for (let k = b; k < e; k++) {
                const o = this.rendered_[k]
                o.top = curPos
                this.position(o)
                curPos += o.height
                // maybe we should have both a tombstone and a div, then we can animate between them? this would keep things from jumping around? size transition as well opacity?
            }
        }

        let a = this.scroller_.scrollTop - this.anchorItem.offset
        for (let b = this.anchorItem.index - this.rendered_start_; b < this.rendered_.length; b++)
            a += this.rendered_[b].height

        const tombstones = this.snap_.length - this.rendered_start_ - this.rendered_.length
        const est = a + tombstones * this.tombstoneHeight_
        this.scrollRunway_.style.transform = `translate(0,${est}px)`;
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