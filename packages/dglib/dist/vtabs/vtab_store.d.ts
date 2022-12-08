export interface Vtab {
    open?: boolean;
    color?: string;
    label?: string;
    icon?: string;
    count?: number;
    children: Vtab[];
}
export declare class VtabStore {
    root?: Vtab;
    selected: number;
}
export declare const vtabPin: import("solid-js").Accessor<boolean>, setVtabPin: import("solid-js").Setter<boolean>;
export declare const menuOpen: import("solid-js").Accessor<boolean>, setMenuOpen: import("solid-js").Setter<boolean>;
export declare const vtabs: VtabStore, setVtabs: import("solid-js/store").SetStoreFunction<VtabStore>;
