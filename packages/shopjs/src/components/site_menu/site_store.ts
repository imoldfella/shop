import { createStore } from "solid-js/store";

// Section[1-6] / page


export class SiteStore {
    root: SiteLink = new SiteLink()
}

export class SiteLink {
    title = ""
    subtitle = ""
    href = ""
    children: SiteLink[] = []
}

export const [site, setSite] = createStore<SiteStore>(new SiteStore);


