import { Component, Match, Switch } from "solid-js";
import { Mdx } from "../layout/mdx";
import { PageDescription } from "../layout/store";


// our state might have a 
export class Db {


}

// note that we don't have direct access to the user db in the sandbox.
// the sandbox code may not be trusted

// our code db is read only, writes all to target db.
export const codeDb = new Db()
export const targetDb = new Db()


// pages come from the code db.
// do we do data loading here? or leave that to the client?
const md = document.getElementById('editor')?.innerText

export function getPage(url: string ) : {html:string, hydrate:()=>void}{
    switch(url) {
    case "/references/concepts/reactivity":
        return {
            html: '',
            hydrate: ()=>{}
        }
        // return some kind of map
        break;
        default:
        return {
            html: '',
            hydrate: ()=>{}
        }
    }

    // what point is this in this case? slightly faster screen pop?
    // we aren't necessarily interactive.

}


// somehow we hydrate the innter content?
export const InnerContent: Component<{path: PageDescription}> = () => {

    return (
        <div class='h-screen h-max-screen  w-full'><Switch>
        <Match when={true}>
            <Mdx md={md??""}/>
        </Match>
    </Switch></div>)
}

/*
        <Match when={layout.app == "iframe"}>
            <iframe class=' w-full h-full overflow-y-auto' src='https://www.datagrove.com'></iframe>
        </Match>
        <Match when={layout.app == "map"}>
            MAP!
        </Match>

*/