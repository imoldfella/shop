

import { createWindowSize } from "@solid-primitives/resize-observer";
import { createEffect, createSignal, For, JSX } from "solid-js";
import { createStore, produce } from 'solid-js/store'
import { usePrefersDark } from "@solid-primitives/media"

import { setDark } from "./dglib";


// we need a general user configuration db where the vtab is a table



window.onmessage = (e) => {
    console.log("Message from iframe", e)
    const rpc = e.data
    switch (rpc.method) {
        case 'dark':
            setDark(rpc.params)
    }
}

// display needs to be full screen if the screen is small enough.
export enum ShowSitemap {
    adaptive,
    none,  // greater than 800 this is split
    full,
    split, // split is same as adaptive?
}
const [sitemap, setSitemap] = createSignal(ShowSitemap.adaptive)
// what are the transitions?
// none -> adaptive | overlay depending on sitemap and 

export enum ShowPagemap {
    adaptive,  // adaptive -> click = toggle. so once its closed or open it can no longer be adaptive.
    none,
    display,
}

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
export interface SearchResult {
    summary: RichText
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

