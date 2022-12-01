
// we need to 

import { layout, pagemap as pageToc, setPagemap, ShowSitemap } from "./store"
import { createEffect, createSignal, Match, Show, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { vtabPin, Vtabs, vtabs } from "../vtabs"
import { Splitter } from "../gridResizer/splitter"
import { SiteMenuContent } from "../site_menu"

import { isMobile } from "../platform"
import { bars_3, listBullet, xCircle } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { sitemap, setSitemap } from "./store"
import { buildToc, testMarkdown } from "../md"

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.
// the content of Layout must all live in an iframe, unless it is the internal content (settings).
// what about a specialized splitter that allows one side to hide?
// sort building that here though.
// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.


export function Mdx() {
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
    return (<main class="w-full ">
        <article>
            <div class='pl-4 pt-4 mb-16' >
                <div class='prose dark:prose-invert prose-neutral' ref={setContent} />
            </div>
        </article>

        <aside class="fixed right-0 z-10 not-prose bg-black text-sm top-0 ml-8 mt-12 mr-8 dark:text-neutral-400"
            classList={{
                "hidden": !pageToc()
            }}
        >
            <div class='text-white mb-2 pl-2 flex'>
                <div class='flex-1'>On this page</div>

            </div>
            <div id="aside" class=" " ref={setAside} />
        </aside>
    </main>)
}

export const InnerContent: Component<{}> = () => {
    return (<div class='h-screen h-max-screen  w-full'><Switch>
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>
        <Match when={true}>
            <Mdx />
        </Match>
    </Switch></div>)
}



// this could be an iframe.
// for mobile we need to have
export const Content: Component<{}> = () => {
    // when sitemap is shown, it might be fixed if mobile
    const mobileSitemap = ()=>true

    // the left of search should be tied to the splitter
    const leftSearch = ()=>4
    const width = ()=> "calc(100% - 24px)"

    const toggleSitemap = () => {
        setSitemap(sitemap()==ShowSitemap.none?  ShowSitemap.full : ShowSitemap.none )
    }
    return (<div>
        <Switch>
        <Match when={sitemap()==ShowSitemap.full}>
        <div class='absolute right-0 w-full h-screen overflow-hidden'>
                <div class='w-full h-full px-2 overflow-y-scroll'>
                <SiteMenuContent />
                </div></div>            
        </Match>
        <Match when={sitemap()==ShowSitemap.split}>
            <Splitter>
                <div class='absolute right-0 w-full h-screen overflow-hidden'>
                <div class='w-full h-full px-2 overflow-y-scroll'>
                <SiteMenuContent />
                </div></div>
                <InnerContent />
            </Splitter>
        </Match>
        <Match when={sitemap()==ShowSitemap.none}>
            <InnerContent />
        </Match>
        </Switch>
        <div class='fixed mr-16  bottom-1 z-10 dark:bg-solid-dark   rounded-md flex items-center'
            style={{
                left: `${leftSearch()}px`,
                width: width()
            }}>
            <Icon path={bars_3} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={() => toggleSitemap} />
            <textarea class='align-middle focus:outline-none rounded-md flex-1 dark:bg-solid-dark ' placeholder="Search or command"></textarea>
            <Icon path={listBullet} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={() => setPagemap(!pageToc())} />
        </div>
    </div>)
}

// try a floating command bar always at the top.
export const Layout: Component<{}> = () => {
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.
    const noServers = true; //isMobile();
    return (
        <div>
            <Switch>
                <Match when={noServers}>
                    <Content />
                </Match>
                <Match when={vtabPin()}>
                    <Splitter>
                        <Vtabs />
                        <Content />
                    </Splitter>
                </Match>
                <Match when={!vtabPin()}>
                    <div class='fixed z-50 left-0 top-0 h-screen'>
                        <Vtabs />
                    </div>
                    <div class='ml-16 w-full'>
                        <div>
                            <Content />
                        </div>
                    </div>
                </Match>
            </Switch>
        </div>)
}



