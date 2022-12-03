import { useLocation } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import { magnifyingGlass, xCircle ,arrowDown, arrowUp, arrowLeft} from "solid-heroicons/outline"
import { Component, createSignal, For, JSX, Match, Show, Switch } from "solid-js"
import { CloseButton, Kbd } from "../core/buttons"
import { SectionNav } from "./nav"
import { SitePreference } from "./preference"

import { Page, site , PageDescription, searchMode, setSearchMode, SearchResult } from "./store"



// we need to build based on the route
// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenuContent: Component<{page: PageDescription}> = (props) => {

  return (<Switch>
    <Match when={searchMode()}>
        <SearchList />
    </Match>
    <Match when={true} >
    <div class='pb-16 pt-2'>
    { site.title()}
    <div class='flex items-center'>
      <div class='flex-1 '><SiteTabs page={props.page}/></div>
    </div>
    <SitePreference page={props.page}/>
    <SiteSearchButton/>
    <div class='mt-4'>
    <SectionNav page={props.page} />
    </div>
    </div>
    </Match>
  </Switch> )
}

// when we click a top tab, it should adjust the page being viewed; each tab maintains a router state. For example you should be able to go to a reference section without losing your place in the tutorial.
// if there is no prior state, we need to default to first page
export const SiteTabs = (props: {page: PageDescription})=>{
  const sections = () => site.root.children
  // this should always give us a lang?
  const path = (e: Page) => props.page.lang + "/" + e.name
  // maybe we should limit this to four some how? maybe we should adaptively change the representation (chips?) if we have too many.
  return  (<div           class="w-full mt-2 flex border border-solid-lightborder dark:border-solid-darkitem rounded-md"
>    <For each={sections()}>{(e,index)=>(
    <a
      classList= {{
        "bg-solid-light dark:bg-solid-dark font-semibold": index()==props.page.topSection,
      }}
      class="flex-1 inline-flex w-full p-2 items-center justify-center whitespace-nowrap first:rounded-l-md border-r border-solid-lightborder dark:border-solid-darkitem hover:text-blue-500 hover:underline last:(rounded-r-md border-0)"
      href={""+index()}
    >
      {e.name}
    </a>)
  }</For></div>)
}


// search as nav. maintains site state for favorites and recents.

export function SiteSearchButton() {
  return (
    <button class=' flex mt-2 mb-2 p-2 w-full border-solid-lightitem dark:border-solid-darkitem border rounded-md dark:bg-solid-dark'
    onclick={()=>{
      console.log("search")
      setSearchMode(true)
    }}
    >
      <Magnifier/>
      <input readonly
        class=" flex-1 focus:outline-none dark:bg-solid-dark"
        placeholder="Search" type="search" />
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>

    </button>
  )
}

export const Magnifier = ()=> <Icon class="mr-2  h-5 w-5 flex-none text-neutral-500" path={magnifyingGlass} />


const [result,setResult] = createSignal<SearchResult[]>([])

export const SearchBox = () => {
  const fn = (e: InputEvent)=>{
    const p = (e.currentTarget as HTMLInputElement).value
    console.log("search", p)
      setResult(fetchResults(p))
    }
  return (<div class=' flex mt-2 mb-2 p-2 w-full border-solid-lightitem dark:border-solid-darkitem border rounded-md dark:bg-solid-dark'
  onclick={()=>{
    console.log("search")
    setSearchMode(true)
  }}
  >
         <Magnifier/>
  <input autofocus
class=" flex-1 focus:outline-none dark:bg-solid-dark"
placeholder="Search" type="search"  onInput={fn} /></div>)
}

// when we click a search it goes to recent. In recent we can star it to go to favorites. In favorites we can X it to delete it.
export const SearchLink : Component<{
  title: string
  href: string
}> = (props) => {
return (<div class='pr-2'>
  <div class='w-full hover:bg-blue-500 rounded-r-lg p-2 flex'>
      <a class='flex-1' href={props.href}>{props.title}</a>
      <button onclick={()=>{}} class='text-neutral-500 hover:text-black dark:hover:text-white'><Icon class='h-6 w-6' path={xCircle}></Icon></button>
      </div>
  </div>)
}

function fetchResults(sp: string) : SearchResult[] {
  if (sp.length==0) {
    return []
  }
  let a : SearchResult[] = []
  for (let i = 0; i<100; i++) {
    a.push({
      title: `found ${i}`,
      href: `goto${i}`
    })
  }
  return a
}


export const SearchList = () => {

  return    (<div class='h-full w-full flex flex-col'>
    <SearchBox/>
    <div class='flex-1 overflow-auto'>
    
      <Switch>
      <Match when={result().length}>
      <For each={result()}>{(e,index)=>
        <SearchLink title={e.title} href={e.href} />
      }</For>
      </Match>
      <Match when={true}>
        <Show when={site.user.recent.length}>
          <div>Recent</div>
        </Show>
        <Show when={site.user.favorites.length}>
          <div class='flex-1'>Favorites</div>          
        </Show>
      </Match>
    </Switch>
    
    </div>
    <div class='text-sm text-neutral-500 flex items-center'>
    <Kbd><Icon path={arrowLeft}/></Kbd> to select
       <Kbd><Icon path={arrowUp}/></Kbd><Kbd><Icon path={arrowDown}/></Kbd> to navigate <Kbd>Esc</Kbd> to close</div>
  </div> )
}
