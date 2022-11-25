
// we need to 

import { layout } from "./store"
import { Match, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { Vtabs, vtabs } from "../vtabs"
import { Splitter } from "./splitter"
import { SiteMenu } from "../site_menu"

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.


export const Content: Component<{}> = () => {
    return (<Switch>
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>
        <Match when={true}>
            <iframe class=' w-full h-full' src='https://www.datagrove.com'></iframe>
        </Match>
    </Switch>)
}
// we might have 0, 1, or 2 splitters.
// when we have 0 tabs we might have a rail or no rail
// when we 
export const Slideout: Component<{open: boolean,children: JSX.Element[]}> = (props) => {
    return (<Switch>
        <Match when={props.open}>
            {props.children[0]}
        </Match>
        <Match when={!open}>
            {props.children[1]}
        </Match>
    </Switch>)
}


export const Drawer: Component<{}> = () => {
    // splitter if pinned, flyover stack if not.
    return (<Switch>
        <Match when={vtabs.pin}>
            <Splitter>
               <Vtabs/>
               <SiteMenu/>
            </Splitter>
        </Match>
        <Match when={true}>
            <Slideout open={layout.open}>
                <Vtabs/>
                <SiteMenu/>
            </Slideout>
        </Match>
    </Switch>)
}


export const Layout: Component<{}> = () => {
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.
    return (<Switch>
        <Match when={layout.mobile || !layout.pin}>
            <Content></Content>
        </Match>
        <Match when={true}>
            <Splitter>
                <Drawer />
                <Content />
            </Splitter>
        </Match>
    </Switch>)
}



