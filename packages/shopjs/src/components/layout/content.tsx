import { Component, Match, Switch } from "solid-js"
import { layout } from "./store"

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
