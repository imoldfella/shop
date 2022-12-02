import { createStore } from "solid-js/store";

// Section[1-6] / page

export type SECTION_LEAF_PAGE = {
  name: string;
  link: string;
};

export type SECTION_PAGE = {
  name: string;
  pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
};

export type SECTIONS = {
  [key: string]: {
    name: string;
    // If this exists, then when the user clicks on the name of the section, it will direct here
    link?: string;
    pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
  };
};


export class SiteStore {
  title = () => "Datagrove"
  root: SiteLink = new SiteLink()
  section: SECTIONS[] = []
  // should be picked by router? how?
  selected: number = 0
  language: {
    [key: string]: string
  } = {}
  // should probably be somewhere else?
  lang: string = 'en'
}


export const rtlLanguages = new Set(['ar']);


export class SiteLink {
  title = ""
  subtitle = ""
  href = ""
  children: SiteLink[] = []
}

export const [site, setSite] = createStore<SiteStore>(new SiteStore);

