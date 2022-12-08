import { Component, createSignal } from "solid-js";


export const DatagroveTitle: Component<{}> = () => (<div class='flex justify-center items-center'><code>Datagrove</code></div>)
export const [innerContent, setInnerContent] = createSignal(<div />)
