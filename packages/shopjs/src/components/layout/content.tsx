import { Component, createSignal, Match, Switch } from "solid-js"
import { layout } from "./store"
import { testMarkdown } from '../content'
import { Toc } from "../toc"



export const Content: Component<{}> = () => {

    return (<div class='h-screen overflow-hidden w-full'><Switch>
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>
        <Match when={true}>
            <Toc />
        </Match>
    </Switch></div>)
}
