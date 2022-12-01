
// we need to 

import { layout, mobile, pagemap, pagemap as pageToc, setPagemap, ShowPagemap, ShowSitemap, showToc, togglePagemap, toggleSitemap } from "./store"
import { createEffect, createSignal, Match, Show, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { vtabPin, Vtabs, vtabs } from "../vtabs"
import { Splitter } from "../gridResizer/splitter"
import { SiteMenuContent } from "../site_menu"

import { isMobile } from "../platform"
import { bars_3, listBullet, pencil, pencilSquare, xCircle } from "solid-heroicons/solid"
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
            content()!.innerHTML = e
            buildToc(content()!, aside()!)
        })
    })

    // toc main sets up the grid
    return (<main class="w-full ">
        <article>
            <div class='w-full pl-4 pt-4 pb-16' >
                <div class='prose dark:prose-invert prose-neutral' ref={setContent} />
            </div>
        </article>

        <aside class="absolute right-0 z-10 not-prose dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800 p-4 rounded-md from- text-sm bottom-16 ml-8 mt-12 mr-8 dark:text-neutral-400"
            classList={{
                "hidden": !showToc()
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
        <Match when={true}>
            <Mdx />
        </Match>    
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>

    </Switch></div>)
}



// this could be an iframe.
// the command is absolute, so its positioned against its first position ancestor
// which is not 
export const Content: Component<{}> = () => {
    // exposing this signal forces us into an iframe because we need a splitter for the frame too. maybe we can pass these functions to the splitter?
    const [leftContent, setLeftContent] = createSignal(300);

    const leftSearch = () => {
        const r = sitemap() == ShowSitemap.split ? leftContent() + 8 : 8 
        console.log("left", r)
        return r
    }
    const width = () => {
        const r = sitemap() == ShowSitemap.split ? `calc(100% - ${leftContent()}px - 40px)` : "calc(100% - 40px)"
        console.log('width', sitemap(), leftContent())
        return r
    }


    return (<div class=' h-full w-full overflow-hidden'>
        <Switch>
            <Match when={mobile()}>
                <InnerContent />
            </Match>            
            <Match when={sitemap() == ShowSitemap.none}>
                <InnerContent />
            </Match>     
           <Match when={sitemap() == ShowSitemap.full}>
                <div class='absolute right-0 w-full h-screen overflow-hidden'>
                    <div class='w-full h-full px-2 overflow-y-scroll'>
                        <SiteMenuContent />
                    </div></div>
            </Match>
            <Match when={sitemap() == ShowSitemap.split}>
                <Splitter left={leftContent} setLeft={setLeftContent} >
                    <div class='w-full h-screen overflow-hidden dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800'>
                        <div class='w-full h-full px-2 overflow-y-scroll'>
                            <SiteMenuContent />
                        </div></div>
                    <div class='w-full h-full px-2 overflow-y-scroll'>
                        <InnerContent />
                    </div>
                </Splitter>
            </Match>

        </Switch>

        <div class='absolute mr-16  bottom-0 z-10 dark:bg-solid-dark   rounded-md flex items-start'
            style={{
                left: `${leftSearch()}px`,
                width: width()
            }}>
            <Icon path={bars_3} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={() => toggleSitemap()} />
            <p  contenteditable class='pt-2 align-middle focus:outline-none rounded-md flex-1 dark:bg-solid-dark '></p>
            <Icon path={listBullet} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={() => togglePagemap()} />
            <Icon class=' h-6 y-6 m-2 hover:text-blue-500 right-8 top-8 z-10 text-blue-700' path={pencilSquare} />
        </div>
    </div>)
}

// try a floating command bar always at the top.
export const Layout: Component<{}> = () => {
    const [left, setLeft] = createSignal(200);
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.

    return (
        <div>
            <Switch>
                <Match when={mobile()}>
                    <Content />
                </Match>
                <Match when={vtabPin()}>
                    <Splitter left={left} setLeft={setLeft}>
                       <div><Vtabs/></div>
                        <div class='fixed h-screen  overflow-hidden' style={{
                            left: `${left() + 12}px`,
                            width: `calc(100% - ${left()}px)`
                        }}>
                            <Content />
                        </div>
                    </Splitter>
                </Match>
                <Match when={!vtabPin()}>
                    <div class='fixed z-50 left-0 top-0 h-screen'>
                        <Vtabs />
                    </div>
                    <div class='fixed left-16 right-0 h-screen'>
                        <Content />
                    </div>
                </Match>
            </Switch>
        </div>)
}

// absolute is not respecting


