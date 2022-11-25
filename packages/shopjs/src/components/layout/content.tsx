import { Component, Match, Switch } from "solid-js"
import { layout } from "./store"

export const Content: Component<{}> = () => {
    return (<div class='h-screen overflow-hidden w-full'><Switch>
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>
        <Match when={true}>
            
        </Match>
    </Switch></div>)
}
