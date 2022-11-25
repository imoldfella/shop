import { Component, For, ParentComponent } from "solid-js"

import Sortable from 'sortablejs'
import { xCircle, xMark } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { vtabs } from "./vtab_store";

// this needs a hover flyout and a pin.
// we need to allow collapsing.
// this could probably have its own store, it's pretty independent.



// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    return (<nav ref={el => new Sortable(el, {
        animation: 150,
        ghostClass: 'bg-neutral-500'
    })} class='bg-gray-900   w-full li-none flex-row overflow-y-auto'>
        <div class='h-12 bg-black relative top-0 w-full left-0'>
           
        </div>

        <For each={vtabs.root!.children}>{(e) =>
            <div class='max-w-sm rounded overflow-hidden shadow-lg flex items-center text-white bg-solid-dark'><img class="rounded-full h-12 w-12 shadow m-2" src={e.icon} />
                <div class=' flex-1'>{e.label}</div><Icon class='flex-none h-5 w-5 m-2 hover:text-white text-gray-400' path={xMark} /></div>

        }</For></nav>)

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