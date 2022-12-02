import { createSignal, Match, Switch } from "solid-js"
import { Splitter } from "./splitter"
import { Component, For, Show } from "solid-js"
//import Sortable from 'sortablejs'
import { chevronLeft, ellipsisHorizontal, mapPin } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { menuOpen, setMenuOpen, setVtabPin, vtabPin, vtabs } from "./store";
import { mobile, ShowSitemap, showSitemap } from "./store";
import { datagrove } from "./dglogo";
import { Icon2 } from "./icon";
import  Sortable  from 'sortablejs'
import ContextMenuWrap from "./menu"

// this needs a hover flyout and a pin.
// we need to allow collapsing.
// this could probably have its own store, it's pretty independent.

// mobile will not call this 
// pin implies open
// unpin + open
// unpin + !open

// https://tabler-icons.io/


// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    const startSortable = (el: HTMLElement) => {
        new Sortable(el, {
        animation: 150,
        ghostClass: 'bg-neutral-500'
    })
   }
    // left chevron action
    const shrink = () => {
        setVtabPin(!vtabPin())
    }
    // click on datagrove logo opens menu? this might not be correct
    const sitemap = () => {
        setMenuOpen(!menuOpen())
    }
    return (<ContextMenuWrap><div class=" h-screen cursor-pointer bg-white dark:bg-neutral-900 overflow-hidden" classList={{
        "w-16  hover:w-64 group": !vtabPin(),
        "w-full": vtabPin()
    }}>
        <div class='absolute  server-link z-20 items-center  dark:bg-neutral-900  flex top-0 w-full '>
            <Icon2 path={datagrove} class='w-12 h-12 flex-none text-blue-700 hover:text-blue-500 m-2' onclick={sitemap} />
            <div class='flex-1'> </div>
            <Show when={vtabPin()} >
                <Icon class='flex-none w-5 h-5 mr-2' path={chevronLeft}
                    onclick={shrink} /></Show>
            <Show when={!vtabPin()} >
                <Icon class='text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 flex-none w-5 h-5 mr-4' path={mapPin}
                    onclick={shrink} /></Show>
        </div>
        <nav
            class='pt-16  h-full w-full li-none flex-row overflow-y-auto'
            ref={ startSortable} >


            <For each={vtabs.root!.children}>{(e, index) =>
                <div class='w-full server-link overflow-hidden  flex items-center'
                    classList={{
                        "server-link-active": index() == 3
                    }}>
                    <img class="flex-none rounded-md h-12 w-12 shadow m-2" src={e.icon} />
                    <Show when={showSitemap() != ShowSitemap.full}>
                        < div class=' flex-1 overflow-hidden cursor-pointer' > {e.label}</div >
                        <Icon class='flex-none  h-5 w-5 m-2 text-blue-700 hover:text-blue-500' path={ellipsisHorizontal} />
                    </Show>
                </div >
            }</For ></nav ></div ></ContextMenuWrap>)

}

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.
// the content of Layout must all live in an iframe, unless it is the internal content (settings).
// what about a specialized splitter that allows one side to hide?
// sort building that here though.
// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.

// myIframe.contentWindow.postMessage('hello', '*');
export function Content() {
    return <iframe class='w-full h-full' src='http://localhost:3001'>
    </iframe>
}

// try a floating command bar always at the top.
export const Layout: Component<{}> = () => {
    const [left, setLeft] = createSignal(200);
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.

    return (
        <div>
            <Switch>
                <Match when={mobile() && showSitemap() == ShowSitemap.full}>
                    <div class='fixed z-10 left-0 top-0 h-screen'><Vtabs /></div>
                    <div class='fixed z-50 left-16 right-0 h-screen'>
                        <Content />
                    </div>
                </Match>
                <Match when={mobile()}>
                    <Content />
                </Match>
                <Match when={vtabPin()}>
                    <Splitter left={left} setLeft={setLeft}>
                        <div><Vtabs /></div>
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


/*
<div class='absolute bottom-0 bg-neutral-900 w-full flex'><Icon class='h-6 w-6 flex-1 m-2 text-blue-700 hover:text-blue-500' path={plus} ></Icon></div>
*/