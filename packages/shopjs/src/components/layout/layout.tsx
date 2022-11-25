
// we need to 

import { layout } from "./store"
import { Match, Switch } from "solid-js"
import type { JSX, Component } from 'solid-js'

import { vtabPin, Vtabs, vtabs } from "../vtabs"
import { Splitter } from "../gridResizer/splitter"
import { SiteMenu } from "../site_menu"
import { Content } from "./content"
import { isMobile } from "../platform"

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.

export const Layout: Component<{}> = () => {
    // if mobile, then no splitter at all.
    // if not mobile then splitter is set by a flag in the layout store.
    return (<Switch>
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
                <Splitter>
                <SiteMenu />
                <Content/>
                </Splitter>
            </div>
        </Match>
    </Switch>)
}



