

import { createWindowSize } from "@solid-primitives/resize-observer";
import { createSignal, For } from "solid-js";
import { createStore } from 'solid-js/store'
import { useLocation } from "@solidjs/router";

export const [searchMode,setSearchMode] = createSignal(false)
// Section[1-6] / page

// the top tabs are special because they define a navigation state.
// we could remember this state even going to another site and back.

// note that the link here is only informally related to the path?
// is that how we should do it? what if we went the other way?
// the path of the file we are displaying is unique, we could use that for the route
// and look up the location in the menu.
// we could also invent a new id altogether, which would have the advantage of 
// being stable? astro uses the reverse lookup approach; the organization of the files
// decides the url.

// all the bits of info we can get from the route

export class PageDescription {
  lang = 'en'
  topTab: Page
  constructor(public page: Page, public topSection: number){
    this.topTab = site.root.children![topSection]
  }
}

export type Page = {
  name: string

  path?: string
  children?: Page[]
  parent?: Page
};


export class Language {
  loaded = false
}
// we can keep cache of languages.
export class SiteStore {
  title = () => (<div class='flex justify-center items-center'><code>Datagrove</code></div>)
  href: string = "https://www.datagrove.com"
  root: Page = {  name: "/", path: "/", children:[]}
  // this could build the entire path in one go.
  // the location will be /en/path#subtitle
  path: Map<string, Page> = new Map()
  home?: Page 
  // should be picked by router? how?
  //selected: number = 0
  language: {
    [key: string]: string
  } = {}
  user = new SiteUser()
}

export interface SearchResult {
  title: string
  href: string
  favorite?: boolean
}
export class SiteUser {
   favorites : SearchResult[] = [
    {title: "fav1", href: "xx" }
   ]
   recent : SearchResult[] = [
    {title: "recent1", href: "xx" }
   ]
}

export class BrowseState {
  // for each tab we need a most recent url visited
  recent: string[] = []
}

export const rtlLanguages = new Set(['ar']);


// export class SiteLink {
//   title = ""
//   subtitle = ""
//   href = ""
//   children: SiteLink[] = []
// }

export const [site, setSite2] = createStore<SiteStore>(new SiteStore);

// we get this in layout and just pass it down. Not very fine grained?
// is this where we want to set the translation? how do we memoize things?

// there are special locationd {lang}/{toptab} that mean to restore the state to whatever was most recently viewed in that tab. if there is no prior state then pick the first page on that tab. 

// a derivative of a location change.
export const pageDescription = () : PageDescription => {
  const loc = useLocation();
  const root = site.root
  const topTab = root.children??[];
  const l = loc.pathname.split('/')
  l.shift() // just an empty string
  let lang = l.length>0?l[0]:'en'
  let top = l.length>1?parseInt(l[1]):0
  if (top >=topTab.length) top = 0

  let p  = site.home
  // case 0 or 1 is just default to home page anyway? here we also try to restore a state.
  if (l.length<=2){
    // here we are just changing tab states, we need to remember our place.
  }  
  if (l.length > 2) {
    // here we are jumping directly to a new place in the tab, establishing a new state for that tab.
    lang = l[1]
    const rest =  loc.pathname.substring(lang.length+1)
    p = site.path.get(rest)
  }

  const r=  new PageDescription(p??site.home!, top)
  console.log('page', r)
  return r
}
export function setSite(s: SiteStore){

  const firstLeaf = (p: Page) : Page =>{
    if (p.children) {
      return firstLeaf(p.children[0])
    }
    return p
  }
  // compile all the paths (not counting language) to a section or leaf.
  // note that we 
  const indexPaths = (o: Page) => {
    if (o.path) s.path.set(o.path, o)
    for (let ch of o.children??[]){
      // is this a problem? it's not clear how we would do it otherwise
      // note that flutter for deep links often builds a stack of widgets, but web doesn't. we are only using this to get a reasonable configuration of the menu expansions
      ch.parent = ch.parent??o
      indexPaths(ch)
    }
  }
  s.home = s.home??firstLeaf(s.root);
  indexPaths(s.root)
  setSite2(s)
  console.log(s)
}

export function dgos(method: string, params: any){
    window?.top?.postMessage({method: method, params: params}, '*')
}
// message from dgos - what?
window.onmessage = function(e) {
    if (e.data == 'hello') {
        alert('It works!');
    }
};
// display needs to be full screen if the screen is small enough.
export enum ShowSitemap {
    adaptive,
    none,  // greater than 800 this is split
    full,
    split, // split is same as adaptive?
}

// what are the transitions?
// none -> adaptive | overlay depending on sitemap and 

export enum ShowPagemap {
    adaptive,  // adaptive -> click = toggle. so once its closed or open it can no longer be adaptive.
    none,
    display,
}
const [sitemap, setSitemap] = createSignal(ShowSitemap.adaptive)
export const [pagemap, setPagemap] = createSignal(ShowPagemap.adaptive)

export const windowSize = createWindowSize();
export const mobile = () => {
    const r = windowSize.width < 650
    //console.log("windowWidth", windowSize.width)
    return r
}

// does it matter where the splitter is? we also need to derive that.
export const showSitemap = (): ShowSitemap => {
    if (mobile()) {
        return sitemap() == ShowSitemap.none ? ShowSitemap.none : ShowSitemap.full
    }
    if (sitemap() == ShowSitemap.adaptive) {
        return windowSize.width > 850 ? ShowSitemap.split : ShowSitemap.none
    }
    // we need to check if there's room for the  sitemap
    // also need to allow the sitemap to shrink if window isn't wide enough.
    return sitemap()
}
export const showToc = (): boolean => {
    if (pagemap() == ShowPagemap.adaptive) {
        return mobile() ? false : true
    }
    return pagemap() == ShowPagemap.display
}
export const toggleSitemap = () => {
    console.log("no sitemap")
    setSitemap(showSitemap() == ShowSitemap.none ? ShowSitemap.split : ShowSitemap.none)
}
export const togglePagemap = () => {
    console.log("no pagemap")
    // once flipped, it can't be adaptive again. Is there a a better approach?
    setPagemap(showToc() ? ShowPagemap.none : ShowPagemap.display)
}
// is there an advantage to one store vs many signals?
// when should files be read only?
// menu could potentially be openWith + file(name, type)

type AppType = "file" | "edit" | "cart" | "ticket"
type FileType = "word" | "present" | "workbook" | "map"

// Folder Tree; mute, sum counts. 
// Flat searches: recent, etc

// a deep link; can identify a single tuple in a query.
export interface RailItem {
    label: string
    icon?: string
    count: number
    iframe: string
}

export interface FolderLike<F, I> extends RailItem {
    open?: boolean
    muted?: boolean
    folder: AppFolder[]
    app: UserAppshot[]
}

export interface AppFolder extends FolderLike<AppFolder, Appshot> {

}

export interface UserAppshot {
    app: Appshot
    sticky: RailItem[]
    muted: RailItem[]
    hidden: RailItem[]
}

// each appshot is associated with a stream
// app shots are named owner-appshot.
// streams are named stream.datagrove.com/owner/stream
// 
export interface Appshot extends RailItem {
    owner: string
    version: number
    stream: Stream
    // the user can hide things, sticky things in the app tree
    menu: AppTree

}
// deep links inside the application, views & lenses
export interface AppTree extends FolderLike<AppTree, AppLink> {
}

export interface AppLink {

}



// a server can have multiple translations?
export interface Stream {
    url: string    // owner-
    count: number
    runner: Appshot
    lang: string
    icon: string
    // ? what other server state do we need
}

export class Query<T> {
    length: number = 0
}
export class Cursor<T> {
    query: Query<T> = new Query<T>()
    anchor: number = 0
    runway: T[] = []
}


// should we use Cursor for display a tree? should we use trees or slidy? or both?
// maybe each open folder is a query so our viewer is a tree of nested queries?

// streams | words | muted | history 
// sticky is orderable
export class LayoutStore {
    open = false
    app: string = ""
    closed: boolean = false
    width: number = 300
    width2: number = 300
    closed2: boolean = false
    folder?: AppFolder
    found?: Cursor<SearchResult>
    recentSearch: string[] = []
    crumb: string[] = []
}
export class RichText {
    html: string = ""// sanitized
}

export interface Scrollable {
    index: number,

}


export class FolderLens {
    item: RailItem[] = []
    reorder(item: RailItem[]) {

    }
}
export async function update(u: Partial<LayoutStore>) {

}


export const [layout, setLayout] = createStore<LayoutStore>(new LayoutStore);

