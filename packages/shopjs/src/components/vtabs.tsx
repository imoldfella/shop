import { Component, For, ParentComponent } from "solid-js"
import { railItems } from "./test"
import Sortable from 'sortablejs'
import { xCircle, xMark } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { TabItem, TabList } from './tabs';

//
let rail = railItems()

export const Card: ParentComponent<{}> = ({ children }) => {
    return <div class="max-w-sm rounded overflow-hidden shadow-lg flex items-center text-white ">{children}</div>
}

// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    return (<nav ref={el => new Sortable(el, {
        animation: 150,
        ghostClass: 'bg-slate-500'
    })} class='bg-gray-900   w-full li-none flex-row overflow-y-auto'>
        <div class='h-24 bg-gray-500 relative top-0 w-full left-0'>
            <p>Title</p>
            <TabList>
                <TabItem class="mr-2" active={true}>Tabs</TabItem>
                <TabItem class="mr-2" active={false}>All</TabItem>
            </TabList>
        </div>

        <For each={rail}>{(e) =>
            <Card><img class=" rounded-full h-12 w-12 shadow m-2" src={e.icon} />
                <div class='flex-1'>{e.label}</div><Icon class='h-5 w-5 m-2 hover:text-white text-gray-400' path={xMark} /></Card>

        }</For></nav>)

}