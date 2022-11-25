
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
        <Match when={true}>
            <Splitter>
                <Switch>
                    <Match when={vtabPin()}>
                        <Splitter>
                            <Vtabs />
                            <SiteMenu />
                        </Splitter>
                    </Match>
                    <Match when={true}>
                        <div class='fixed left-0 top-0 h-screen'>
                            <Vtabs />
                        </div>
                        <SiteMenu />
                    </Match>
                </Switch>
                <Content />
            </Splitter>
        </Match>
    </Switch>)
}



