

import { createSignal, For } from "solid-js";

// Folder Tree; mute, sum counts. 
// Flat searches: recent, etc

// a deep link; can identify a single tuple in a query.
export interface RailItem {
    label: string
    icon?: string
    count: number
    iframe: string
}

export interface FolderLike<F,I> extends RailItem {
    open?: boolean
    muted?: boolean
    folder: AppFolder[]
    app: UserAppshot[]
}

export interface AppFolder extends FolderLike<AppFolder,Appshot>  {

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
export interface Appshot extends RailItem{
    owner: string
    version: number
    stream: Stream
    // the user can hide things, sticky things in the app tree
    menu: AppTree

}
// deep links inside the application, views & lenses
export interface AppTree extends FolderLike<AppTree,AppLink> {
}

export interface AppLink {

}



// a server can have multiple translations?
export interface Stream{
    url: string    // owner-
    count: number
    runner: Appshot
    lang: string
    icon: string
    // ? what other server state do we need
}

export class Query<T> {
    length: number
}
export class Cursor<T> {
    query: Query<T>
    anchor: number
    runway: T[]
}


// should we use Cursor for display a tree? should we use trees or slidy? or both?
// maybe each open folder is a query so our viewer is a tree of nested queries?

// streams | words | muted | history 
// sticky is orderable
export interface RailData {
    folder: AppFolder
    found?: Cursor<SearchResult>
    recentSearch: string[]
    crumb: string[]
}
export class RichText {
    html: string // sanitized
}
export interface SearchResult {
    summary: RichText
}
export interface Scrollable {
    index: number,

}

export const [store, setStore] = createSignal<RailData>();


export async  function search(data: string) {

}

export class FolderLens {
    item: RailItem[]
    reorder(item: RailItem[]){
        
    }
}



export async function update(u: Partial<RailData>){

}