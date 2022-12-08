import { Component, JSX } from "solid-js";
import { PageDescription, SearchResult } from "./store";
export declare const SiteMenuContent: Component<{
    page: PageDescription;
}>;
export declare function SiteSearchButton(): JSX.Element;
export declare const Magnifier: () => JSX.Element;
export declare const SearchBox: () => JSX.Element;
export declare const FavoriteLink: Component<{
    result: SearchResult;
    index: number;
}>;
export declare const RecentLink: Component<{
    result: SearchResult;
    index: number;
}>;
export declare const SearchLink: Component<{
    result: SearchResult;
}>;
export declare const SearchList: () => JSX.Element;
