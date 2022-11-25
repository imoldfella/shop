import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export interface Vtab {
    label?: string
    icon?: string
    count?: number
    // groups always
    children: Vtab[]
}

export class VtabStore {
    root?: Vtab
}

export const [vtabPin, setVtabPin] = createSignal(false)
export const [menuOpen, setMenuOpen] = createSignal(true)

//export const [vtabOpen, setOpen] = createSignal(true)
export const [vtabs, setVtabs] = createStore<VtabStore>(new VtabStore);

