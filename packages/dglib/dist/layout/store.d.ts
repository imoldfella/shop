import { Location } from "@solidjs/router";
export declare const searchMode: import("solid-js").Accessor<boolean>, setSearchMode: import("solid-js").Setter<boolean>;
export declare class PageDescription {
    page: Page;
    topSection: number;
    loc: Location<any>;
    lang: string;
    constructor(page: Page, topSection: number, loc: Location<any>);
    get topTab(): Page;
}
export declare type Page = {
    name: string;
    path?: string;
    children?: Page[];
    parent?: Page;
};
export declare class Language {
    loaded: boolean;
}
export declare class SiteStore {
    title: import("solid-js").Component<{}>;
    href: string;
    sitemap: Page[];
    language: {
        [key: string]: string;
    };
    root: Page;
    path: Map<string, Page>;
    home?: Page;
    search: SearchResult[];
}
export interface SearchResult {
    title: string;
    href: string;
    favorite?: boolean;
}
export declare const favorites: import("solid-js").Accessor<SearchResult[]>, setFavorites: import("solid-js").Setter<SearchResult[]>;
export declare const recent: import("solid-js").Accessor<SearchResult[]>, setRecent: import("solid-js").Setter<SearchResult[]>;
export declare function addFavorite(x: number): void;
export declare function removeFavorite(x: number): void;
export declare function removeRecent(x: number): SearchResult;
export declare function addRecent(x: SearchResult): void;
export declare function fetchResults(sp: string): SearchResult[];
export declare class BrowseState {
    recent: string[];
}
export declare const rtlLanguages: Set<string>;
export declare const site: SiteStore, setSite2: import("solid-js/store").SetStoreFunction<SiteStore>;
export declare const pageDescription: () => PageDescription;
export declare function setSite(s: SiteStore, lang: string): void;
export declare function dgos(method: string, params: any): void;
export declare enum ShowSitemap {
    adaptive = 0,
    none = 1,
    full = 2,
    split = 3
}
export declare enum ShowPagemap {
    adaptive = 0,
    none = 1,
    display = 2
}
export declare const pagemap: import("solid-js").Accessor<ShowPagemap>, setPagemap: import("solid-js").Setter<ShowPagemap>;
export declare const windowSize: {
    readonly width: number;
    readonly height: number;
};
export declare const mobile: () => boolean;
export declare const showSitemap: () => ShowSitemap;
export declare const showToc: () => boolean;
export declare const toggleSitemap: () => void;
export declare const togglePagemap: () => void;
export interface RailItem {
    label: string;
    icon?: string;
    count: number;
    iframe: string;
}
export interface FolderLike<F, I> extends RailItem {
    open?: boolean;
    muted?: boolean;
    folder: AppFolder[];
    app: UserAppshot[];
}
export interface AppFolder extends FolderLike<AppFolder, Appshot> {
}
export interface UserAppshot {
    app: Appshot;
    sticky: RailItem[];
    muted: RailItem[];
    hidden: RailItem[];
}
export interface Appshot extends RailItem {
    owner: string;
    version: number;
    stream: Stream;
    menu: AppTree;
}
export interface AppTree extends FolderLike<AppTree, AppLink> {
}
export interface AppLink {
}
export interface Stream {
    url: string;
    count: number;
    runner: Appshot;
    lang: string;
    icon: string;
}
export declare class Query<T> {
    length: number;
}
export declare class Cursor<T> {
    query: Query<T>;
    anchor: number;
    runway: T[];
}
export declare class LayoutStore {
    open: boolean;
    app: string;
    closed: boolean;
    width: number;
    width2: number;
    closed2: boolean;
    folder?: AppFolder;
    found?: Cursor<SearchResult>;
    recentSearch: string[];
    crumb: string[];
}
export declare class RichText {
    html: string;
}
export interface Scrollable {
    index: number;
}
export declare class FolderLens {
    item: RailItem[];
    reorder(item: RailItem[]): void;
}
export declare function update(u: Partial<LayoutStore>): Promise<void>;
export declare const layout: LayoutStore, setLayout: import("solid-js/store").SetStoreFunction<LayoutStore>;
