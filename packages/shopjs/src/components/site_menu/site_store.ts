import { useLocation } from "@solidjs/router";
import { createStore } from "solid-js/store";

// Section[1-6] / page

// note that the link here is only informally related to the path?
// is that how we should do it? what if we went the other way?
// the path of the file we are displaying is unique, we could use that for the route
// and look up the location in the menu.
// we could also invent a new id altogether, which would have the advantage of 
// being stable? astro uses the reverse lookup approach; the organization of the files
// decides the url.
export type Page = {
  name: string
  path?: string
  children?: Page[]
  parent?: Page
};

// sections should be a list, then we can make a map from it
// we might be able to count on javascript maps, but views on this are conflicted.

// there should only be a view sections, typically two.
// export type Section = {
//     name: string
//     // by default we can convert the name to a link by lower case and replace space with hyphen.
//     href: string
//     pages: Array<SectionPage | LeafPage>
// };

// it's a little odd if we force the user to start over when switching tabs?
// sh0o00uld we try to keep the tab state?

// all the bits of info we can get from the route
export class PageDescription {
  lang = 'en'
  selected = 0
  root: Page
  constructor(public page: Page){
    // the root is the root tab; one down from actual root.
    let p = page
    while (p.parent?.parent) {
      p = p.parent
    }
    this.root = p
  }
}

export class Language {
  loaded = false
}
// we can keep cache of languages.
export class SiteStore {
  title = () => "Datagrove"
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
export const pageDescription = () : PageDescription => {
  const loc = useLocation();
  const l = loc.pathname.split('/')
  let lang = 'en'
  let p  = site.home
  if (l.length >= 2) {
    lang = l[1]
    const rest =  loc.pathname.substring(lang.length+1)
    p = site.path.get(rest)

    // if we can't find it, it might be a 
  }
  console.log(`${p?"found":"??"}, WTF(${lang}), WTF(${loc.pathname.substring(lang.length+1)})`)
  return  new PageDescription(p??site.home!!)

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