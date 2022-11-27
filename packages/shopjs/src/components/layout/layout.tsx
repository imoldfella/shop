
// we need to 

import { layout, pagemap, setPagemap } from "./store"
import { createEffect, createSignal, Match, Show, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { vtabPin, Vtabs, vtabs } from "../vtabs"
import { Splitter } from "../gridResizer/splitter"
import { SiteMenu } from "../site_menu"

import { isMobile } from "../platform"
import { bars_3, listBullet, xCircle } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { sitemap, setSitemap} from "./store"
import { buildToc, testMarkdown } from "../md"
// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.

export function CloseButton() {
    return  <Icon path={xCircle} class='flex-none w-5 h-5 text-blue-700 hover-text-blue-500' />
}
// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.
export function Toc() {
    const [aside, setAside] = createSignal(null as HTMLElement | null)
    const [content, setContent] = createSignal(null as HTMLElement | null)

    createEffect(() => {
        
        testMarkdown().then((e) => {
            console.log("wtf", content(), aside(), e)
            content()!.innerHTML = e
            buildToc(content()!, aside()!)
        })
    })

    // toc main sets up the grid
    return (<main class="tocmain">
        <article>

        <div class='pb-8 max-h-screen prose prose-neutral dark:prose-invert overflow-y-scroll' ref={setContent} />
        </article>
       
       <div classList={{
            "hidden": !pagemap()
       }}>
        <aside class="not-prose sticky text-sm top-0 ml-8 pt-16 dark:text-neutral-400">
        <div class='text-white mb-2 pl-2 flex'>
            <div class='flex-1'>On this page</div>

        </div>
        <div id="aside" class=" " ref={setAside} />
        </aside></div>
    </main>)
}

export const Content: Component<{}> = () => {

    return (<div class='h-screen overflow-hidden w-full'><Switch>
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>
        <Match when={true}>
            <Toc />
        </Match>
    </Switch></div>)
}


export function TopNav() {
    return      (<div class='dark:bg-solid-dark  w-full h-12 rounded-md flex items-center'>
    <Icon path={bars_3} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={()=>setSitemap(!sitemap())}/>
    <input class='focus:outline-none rounded-md flex-1 dark:bg-solid-dark ' placeholder='Search or Command' />
    <Icon path={listBullet} class='h-6 w-6 m-24 flex-none text-blue-700 hover:text-blue-500'  onclick={()=>setPagemap(!pagemap())} />
</div>)
}
// try a floating command bar always at the top.
export const Layout: Component<{}> = () => {
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.
    return (
    
    <div>
   
        <Switch>
        <Match when={isMobile()}>
            <div classList={{
                "ml-16": !isMobile()
            }}>
                <Content></Content>
            </div>
        </Match>
        <Match when={vtabPin()}>
            <Splitter>
                <Vtabs />
                <Splitter> 
                
                <SiteMenu />
                <Content/>
                </Splitter>
            </Splitter>
        </Match>
        <Match when={!vtabPin()}>
            <div class='fixed z-50 left-0 top-0 h-screen'>
                <Vtabs />
            </div>
            <div class='ml-20 w-full'>
                <div>
                    <TopNav/>
                    <Show when={sitemap()}>
                        <Splitter>
                        <SiteMenu />
                        <Content/>
                        </Splitter>
                    </Show>
                    <Show when={!sitemap()}>
                        <Content/>
                    </Show>
                </div>
            </div>
        </Match>
    </Switch></div>)
}



