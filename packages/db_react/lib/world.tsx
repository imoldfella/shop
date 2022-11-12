import React, { Fragment, ReactPropTypes, useState } from 'react'
import {  MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import {

    XCircleIcon
} from '@heroicons/react/24/outline'
import { SearchComplete } from './search'
import { useMediaQuery } from 'react-responsive'
import { Localized } from "@fluent/react";
import { AppLocalizationProvider,LabeledId } from './l10n'

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export class Universe {
    // Universe is shared among your tabs and devices
}
export class AppRegistry<T> {
    [key: string]: T
}
// no login is a guest of some server, so only that server will appear in the rail
interface Login {
    username: string
}
export interface App {
    panning?: boolean
    icon: (x: any) => JSX.Element
    render: (x: any) => JSX.Element
}
export abstract class RailApp {
    abstract fullScreen: boolean
    abstract icon(): JSX.Element
    abstract render(): JSX.Element
}
export class World {
    u = new Universe()
    login?: boolean
    altLogin: Login[] = []

    rail: RailApp[] = []
    app = new AppRegistry<App>()

    // local things, should these be in a different object?
    railSelect = 0
    locale = "en-US"
    locales : LabeledId[] = []

    update = (x: Partial<World>)=>{}
}
let world = new World()
const worldContext = React.createContext<World>(world)
// each app needs to define 
export function useWorld() {
    return React.useContext(worldContext)
}

export function WorldProvider({ children }: {
    children: JSX.Element
}) {
    const { Provider } = worldContext
    const reducer = (state: World, action: Partial<World>) => {
        console.log("reduce", action.railSelect)
        world =  {
            ...state,
            ...action
        }
        return world
    }
    const [state, dispatch] = React.useReducer(reducer, world)
    world.update = dispatch
    return (     
      <AppLocalizationProvider locale={world.locale} locales={world.locales}
    >
    
    <Provider value={world}>
        {children}
    </Provider></AppLocalizationProvider>)
}


type InitProps = {
    world: Partial<World>
}
export async function initialize(props: InitProps) : Promise<void>{
    
    world = {
        ...world,
        ...props.world
    }
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


/*
interface Drawable {
    render: (x: any) => JSX.Element
}

export class WorldTx {
    data: Partial<World> = {}
    commit() {

    }
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
function renderDiscuss() {
    return (<b>discuss</b>)
}
function renderMap() {
    return (<b>Map</b>)
}

function Avatar() {
    return ()
}
        { name: 'DM', app: 'dm' },
        { name: 'Archive', href: '#', icon: ArchiveBoxIcon },
        { name: 'Customers', href: '#', icon: UserCircleIcon },
        { name: 'Flagged', href: '#', icon: FlagIcon, },
        { name: 'Spam', href: '#', icon: NoSymbolIcon, },
        { name: 'Drafts', href: '#', icon: PencilSquareIcon, },

         


// const emptyWorld: World = {
//     login: undefined,
//     altLogin: [],
//     rail: [],
//     app: {},
//     railApp: {},
// }



*/