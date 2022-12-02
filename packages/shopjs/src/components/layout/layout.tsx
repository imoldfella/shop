
// we need to 

import { layout, mobile, pagemap, pagemap as pageToc, setPagemap, ShowPagemap, ShowSitemap, showToc, togglePagemap, toggleSitemap } from "./store"
import { createSignal, Match, Show, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { vtabPin, Vtabs, vtabs } from "../vtabs"
import { Splitter } from "../gridResizer/splitter"
import { SiteMenuContent } from "../site_menu"

import { bars_3, chevronLeft, chevronRight, listBullet, pencil, pencilSquare, xCircle } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { showSitemap } from "./store"
import { Mdx } from "./mdx"
import { pageDescription } from "../site_menu/site_store"

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.
// the content of Layout must all live in an iframe, unless it is the internal content (settings).
// what about a specialized splitter that allows one side to hide?
// sort building that here though.
// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.

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
        const r = showSitemap() == ShowSitemap.split ? leftContent() : 0
        console.log("left", r)
        return r
    }
    const width = () => {
        const r = showSitemap() == ShowSitemap.split ? `calc(100% - ${leftContent()}px )` : "calc(100%)"
        console.log('width', showSitemap(), leftContent())
        return r
    }

    const pd = pageDescription()

    return (<div class=' h-full w-full overflow-hidden'>
        <Switch>
            <Match when={showSitemap() == ShowSitemap.full}>
                <div class='absolute right-0 w-full h-screen overflow-hidden'>
                    <div class='w-full h-full px-2 overflow-y-scroll'>
                        <SiteMenuContent page={pd} />
                    </div></div>
            </Match>
            <Match when={mobile()}>
                <InnerContent />
            </Match>
            <Match when={showSitemap() == ShowSitemap.none}>
                <InnerContent />
            </Match>

            <Match when={showSitemap() == ShowSitemap.split}>
                <Splitter left={leftContent} setLeft={setLeftContent} >
                    <div class='w-full h-screen overflow-hidden dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800'>
                        <div class='w-full h-full px-2 overflow-y-scroll'>
                            <SiteMenuContent page={pd} />
                        </div></div>
                    <div class='w-full h-full px-2 overflow-y-scroll'>
                        <InnerContent />
                    </div>
                </Splitter>
            </Match>

        </Switch>

        <div class='absolute   bottom-0 z-10 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900   flex items-start'
            style={{
                left: `${leftSearch()}px`,
                width: width()
            }}>
            <Icon path={showSitemap() == ShowSitemap.full ? chevronLeft : bars_3} class='h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500' onclick={() => toggleSitemap()} />
            <p contenteditable class='pt-2 align-middle focus:outline-none rounded-md flex-1'></p>
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
    return <Content/>
}

// absolute is not respecting


