import { For, Show } from "solid-js"
import Sortable from 'sortablejs'
import { chevronLeft, mapPin, xMark } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { setVtabPin, vtabPin, vtabs } from "./vtab_store";


// this needs a hover flyout and a pin.
// we need to allow collapsing.
// this could probably have its own store, it's pretty independent.

// mobile will not call this 
// pin implies open
// unpin + open
// unpin + !open

// https://tabler-icons.io/

// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    const shrink = () => {
        setVtabPin(!vtabPin())
    }
    return (<div class=" cursor-pointer bg-white dark:bg-black overflow-hidden" classList={{
        "w-16  hover:w-64 group": !vtabPin(),
        "w-full": vtabPin()
    }}>
        <div class='h-12  bg-black items-center relative flex top-0 w-full left-0'>
            <div class='flex-1'> </div>
            <Show when={vtabPin()} >
                <Icon class='flex-none w-5 h-5 mr-2' path={chevronLeft}
                    onclick={shrink} /></Show>
            <Show when={!vtabPin()} >
                <Icon class='text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 flex-none w-5 h-5' path={mapPin}
                    onclick={shrink} /></Show>
        </div>
        <nav
            class='  h-full w-full li-none flex-row overflow-y-auto'
            ref={el => new Sortable(el, {
                animation: 150,
                ghostClass: 'bg-neutral-500'
            })} >


            <For each={vtabs.root!.children}>{(e) =>

                <div class='w-full rounded overflow-hidden shadow-lg flex items-center text-white'><img class="flex-none rounded-full h-12 w-12 shadow m-2" src={e.icon} />

                    < div class=' flex-1 cursor-pointer' > {e.label}</div >
                    <Icon class='flex-none h-5 w-5 m-2 hover:text-white text-gray-400' path={xMark} />
                </div >
            }</For ></nav ></div >)

}

/*
import { For } from "solid-js"

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

}*/