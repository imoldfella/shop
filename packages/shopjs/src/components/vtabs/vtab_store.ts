import { createStore } from "solid-js/store";

export interface Vtab {
    label?: string
    icon?: string
    count?: number
    // groups always
    children: Vtab[]
}

export class VtabStore {
    pin = true
    root?: Vtab
}

export const [vtabs, setVtabs] = createStore<VtabStore>(new VtabStore);

