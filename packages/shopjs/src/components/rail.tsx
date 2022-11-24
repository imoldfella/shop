import { For } from "solid-js"
import { railItems } from "./test"
import Sortable from 'sortablejs'

let rail = railItems()
// the rail is the .sticky folder in the root.
export const Rail = () => {
   return  (<nav ref={el=>new Sortable(el,{
        animation: 150,
        ghostClass: 'bg-slate-500'
    })} class='bg-gray-900   w-16 flex-none li-none flex-row'>
   
        <For each={rail}>{(e) =><div class=''><img class=" rounded-full h-12 w-12 shadow m-2" src={e.icon} /></div>
            
        }</For></nav>)

}