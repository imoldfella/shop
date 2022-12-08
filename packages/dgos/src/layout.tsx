import { createSignal, Match, Switch, Component, For, Show } from "solid-js"
import { chevronLeft, ellipsisHorizontal, mapPin } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { menuOpen, setMenuOpen, setVtabPin, Vtab, vtabPin, vtabs, mobile, ShowSitemap, showSitemap } from "./store";
import Sortable from 'sortablejs'
import { Splitter, datagrove, Icon2 } from './dglib'

// this needs a hover flyout and a pin.
// we need to allow collapsing.
// this could probably have its own store, it's pretty independent.

// mobile will not call this 
// pin implies open
// unpin + open
// unpin + !open

// pin icon - https://tabler-icons.io/

// create a set of iframes, caching them.

const VtabTitle: Component<{}> = (props) => {
    // left chevron action
    const shrink = () => {
        setVtabPin(!vtabPin())
    }
    // click on datagrove logo opens menu? this might not be correct
    const sitemap = () => {
        setMenuOpen(!menuOpen())
    }
    return (<div class='sticky  server-link z-20 items-center  dark:bg-neutral-900  flex top-0 w-full '>
        <Icon2 path={datagrove} class='w-12 h-12 flex-none text-blue-700 hover:text-blue-500 m-2' onclick={sitemap} />
        <div class='flex-1'> </div>
        <Show when={vtabPin()} >
            <Icon class='flex-none w-5 h-5 mr-2 text-blue-500 hover:text-blue-700' path={chevronLeft}
                onclick={shrink} /></Show>
        <Show when={!vtabPin()} >
            <Icon class='text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 flex-none w-5 h-5 mr-4' path={mapPin}
                onclick={shrink} /></Show>
    </div>)
}

// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    const startSortable = (el: HTMLElement) => {
        new Sortable(el, {
            animation: 150,
            ghostClass: 'bg-neutral-500'
        })
    }

    return (<div class=" h-screen cursor-pointer bg-white overflow-hidden" classList={{
        "w-16  hover:w-64 group": !vtabPin(),
        "w-full": vtabPin()
    }}>
        <div class='h-full  dark:bg-neutral-900' >
            <VtabTitle />
            <nav
                class='pt-16  h-full w-full li-none flex-row overflow-y-auto'
                ref={startSortable} >
                <For each={vtabs.root!.children}>{(e, index) =>
                    <div class='w-full server-link overflow-hidden  flex items-center'
                        classList={{
                            "server-link-active": index() == 3
                        }}>
                        <img title='a' class="flex-none rounded-md h-12 w-12 shadow m-2" src={e.icon} />
                        <Show when={showSitemap() != ShowSitemap.full}>
                            < div class=' flex-1 overflow-hidden cursor-pointer' > {e.label}</div >
                            <Icon class='flex-none  h-5 w-5 m-2 text-blue-700 hover:text-blue-500' path={ellipsisHorizontal} />
                        </Show>
                    </div >
                }</For ></nav ></div ></div>)

}

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.
// the content of Layout must all live in an iframe, unless it is the internal content (settings).
// what about a specialized splitter that allows one side to hide?
// sort building that here though.
// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.

// myIframe.contentWindow.postMessage('hello', '*');

// create 100 empty iframes, display one.
// use injection to update empty ones when a new server is activated.
// solid guarantees this is only ever run once.
// if we forced an iframe for every server, then when we add a server it will rerun
// does it disrupt existing servers though?

// can we gogorbjs

// this is generating vtabs, how do we generate the corresponding iframe? make a flat list?

const Content: Component<{}> = (props) => {
    return (<iframe sandbox='' title='a' class='w-full h-full' srcdoc='<div style="background-color:  white">hello, world<div>'>
    </iframe>)
}


const ContentN: Component<{}> = (props) => {
    return <div>
        <For each={Object.entries(vtabs.iframe)} >{(e, index) =>
            <iframe sandbox='' title='a' class='w-full h-full' srcdoc='<div style="background-color:  white">hello, world<div>'>

            </iframe>}</For>
    </div>
}

// try a floating command bar always at the top.
export const Layout: Component<{}> = () => {
    // attempt here is to pass the splitter signal in, so we can observe it easily
    // should this be a context instead?
    const left = createSignal(255);
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.

    // return (
    //     <Splitter left={left} class='h-screen w-screen' >
    //         <div class='bg-red-500 w-full h-full' >WTF?</div>
    //         <div class='bg-blue-500 w-full h-full'>WTF!</div>
    //     </Splitter>)

    return (
        <div class='h-sceen w-screen'>
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
                    <Splitter left={left} class=''>
                        <Vtabs />
                        <Content />
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
        </div >)
}

// absolute is not respecting

/*
// why
                        <div class='fixed h-screen  overflow-hidden' style={{
                            left: `${left() + 12}px`,
                            width: `calc(100% - ${left()}px)`
                        }}>
/*
<div class='absolute bottom-0 bg-neutral-900 w-full flex'><Icon class='h-6 w-6 flex-1 m-2 text-blue-700 hover:text-blue-500' path={plus} ></Icon></div>
*/