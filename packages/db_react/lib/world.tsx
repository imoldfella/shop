import React, { Fragment, ReactPropTypes, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CircleStackIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
    ArchiveBoxIcon,
    Bars3Icon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    NoSymbolIcon,
    PencilSquareIcon,
    UserCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'
import { SearchComplete } from './search'
import { useMediaQuery } from 'react-responsive'


export interface World {
    rail: RailItem[]
    app: AppRegistry
}
export interface AppRegistry {
    [key: string]: App
}
export interface App {
    panning?: boolean
    icon: (x: any) => JSX.Element
    render: (x: any) => JSX.Element
}


class DmApp implements App {

    icon(){
        return (<CircleStackIcon/>)
    }
    render(){
        return (<div>DmApp</div>)
    }
}


////////////////////
// test setup, will delete
// 
const world : World = {
    rail: [
    { name: 'Open', href: '#', icon: InboxIcon },
    { name: 'Archive', href: '#', icon: ArchiveBoxIcon },
    { name: 'Customers', href: '#', icon: UserCircleIcon },
    { name: 'Flagged', href: '#', icon: FlagIcon, },
    { name: 'Spam', href: '#', icon: NoSymbolIcon, },
    { name: 'Drafts', href: '#', icon: PencilSquareIcon, },
    ],
    app: {
        'dm': new DmApp(),
    }
}



///////////////////////////////////////
// react interface.
const worldContext = React.createContext<World>(world)
export function WorldProvider({children}:{
    children: JSX.Element
}) {
    const { Provider } = worldContext
    const reducer = (state: World,action: WorldTx)=>{
        return state
    }
    const [state, dispatch] = React.useReducer(reducer, world)
    return (<Provider value={world}>
        {children}
        </Provider>)
}
// each app needs to define 
export function useWorld() {
    return React.useContext(worldContext)
}


export class WorldTx {

    commit() {

    }
} 
export interface RailItem {
    name: string
    href: string
    icon: (x: any) => JSX.Element
}


export const appDiscuss: App = {
    panning: false,
    icon: CircleStackIcon,
    render: renderDiscuss
}
const appMap: App = {
    panning: true,
    icon: ChevronDownIcon,
    render: renderMap
}

const apps: AppRegistry = {
    appDiscuss, appMap
}



export interface File {
    app: string
    path: Uint8Array // count and path
}

// we need to remember which ones are expanded
export class BranchReader {
    expand(f: File) {

    }
    get length(): number {
        return 0
    }
    slice(from: number, to: number): File[] {
        return []
    }
}
const user = {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    {
        name: 'Inboxes',
        href: '#',
        children: [
            { name: 'Technical Support', href: '#' },
            { name: 'Sales', href: '#' },
            { name: 'General', href: '#' },
        ],
    },
    { name: 'Reporting', href: '#', children: [] },
    { name: 'Settings', href: '#', children: [] },
]

// this needs to be a parameter, menu at the top, then context.

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function renderDiscuss() {
    return (<b>discuss</b>)
}
function renderMap() {
    return (<b>Map</b>)
}
