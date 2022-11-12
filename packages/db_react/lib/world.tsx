import React, { Fragment, ReactPropTypes, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CircleStackIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import {
    ArchiveBoxIcon,
    Bars3Icon,
    BellIcon,
    ChatBubbleLeftIcon,
    FlagIcon,
    InboxIcon,
    NoSymbolIcon,
    PencilSquareIcon,
    UserCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'
import { SearchComplete } from './search'
import { useMediaQuery } from 'react-responsive'
import { Localized } from "@fluent/react";

interface Drawable {
    render: (x: any) => JSX.Element
}

export class World {
    login?: boolean
    altLogin: Login[] = []

    rail: Extension[] = []
    app = new AppRegistry<App>()
}


// no login is a guest of some server, so only that server will appear in the rail
interface Login {
    username: string
}
// const emptyWorld: World = {
//     login: undefined,
//     altLogin: [],
//     rail: [],
//     app: {},
//     railApp: {},
// }
export class AppRegistry<T> {
    [key: string]: T
}
export interface App {
    panning?: boolean
    icon: (x: any) => JSX.Element
    render: (x: any) => JSX.Element
}

///////////////////////////////////////
// react interface.
let world = new World()
const worldContext = React.createContext<World>(world)
export function WorldProvider({ children }: {
    children: JSX.Element
}) {
    const { Provider } = worldContext
    const reducer = (state: World, action: WorldTx) => {
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

function renderDiscuss() {
    return (<b>discuss</b>)
}
function renderMap() {
    return (<b>Map</b>)
}

class Avatar {
    constructor(public data: Uint8Array) {
    }
}

abstract class Extension {
    abstract fullScreen: boolean
    abstract icon(): JSX.Element
    abstract render(): JSX.Element
}


// in full screen mode this needs a close which closes the rail as well.
// drawers are typically sand boxed in in iframe, but we can have local ones
function LocalDrawer({ onClose }: { onClose?: () => void }) {

    return (<aside className=" flex h-screen w-full flex-col overflow-y-auto   text-white bg-gray-900" >

        {/* search */}
        <div className="flex flex-row items-center border-gray-600 border rounded-lg m-4 ">
            <input className=' w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a conversation' />

            {/* we need a search list here */}
            <XCircleIcon className='w-6 h-6 m-2 text-blue-600 hover:text-blue-400' onClick={onClose} />

        </div>
    </aside>)
}

// rail items need to render a drawer. they may zoom the drawer to full screen.
// users need to control their own rail items with a few standard ones.
// servers need their own translations?
export interface ServerGroupProps {
    name: string
    href?: string
    icon: Uint8Array
    app?: string

}

class ServerGroup extends Extension {
    fullScreen = false
    icon(): JSX.Element {
        return (<img
            className="inline-block h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
        />)
    }
    render(): JSX.Element {
        return (<LocalDrawer />)
    }

    constructor(props: ServerGroupProps) {
        super()
    }

}
class CreateServer extends Extension {
    fullScreen = true
    icon() {
        return (<PlusIcon className='h-6 w-6 m-2' title='Create Server' />)
    }
    render() {
        return (<div>Add Server</div>)
    }
}
class FindServer extends Extension {
    fullScreen = true
    icon() {
        return (<MagnifyingGlassIcon className='h-6 w-6 m-2' title='Find Server' />)
    }
    render() {
        return (<div>Find Server</div>)
    }
}
class DmApp extends Extension {
    fullScreen = false
    constructor() {
        super();
    }
    icon() {
        return (<ChatBubbleLeftIcon className='h-6 w-6 m-2' title='Secure Chat' />)
    }
    render() {
        return (<div>DmApp</div>)
    }
}

// main can call this before startup. the default can be to load as a guest of the server the app is loaded from
export async function initialize() {

    // this should be guest | logged out | logged in.
    let loggedin = false;
    if (loggedin) {

    } else {

    }
}
// let {l10n} = useLocalization();
// alert(l10n.getString("hello"));

////////////////////
// test setup, will delete
// we need to load this from the database, to do that we may need to login. what will get if we don't?
export async function initializeTest() {
    world = {

        rail: [
            new DmApp(),
            new ServerGroup({
                name: 'How should we live?',
                icon: new Uint8Array(0),
            }),
            new CreateServer(),
            new FindServer(),
        ],


        app: {
            appDiscuss, appMap
        },
        altLogin: []
    }
}

/*
        { name: 'DM', app: 'dm' },
        { name: 'Archive', href: '#', icon: ArchiveBoxIcon },
        { name: 'Customers', href: '#', icon: UserCircleIcon },
        { name: 'Flagged', href: '#', icon: FlagIcon, },
        { name: 'Spam', href: '#', icon: NoSymbolIcon, },
        { name: 'Drafts', href: '#', icon: PencilSquareIcon, },
*/