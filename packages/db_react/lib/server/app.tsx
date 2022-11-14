import React, { Fragment, ReactPropTypes, useState } from 'react'
import {  MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import {

    XCircleIcon
} from '@heroicons/react/24/outline'
import { useMediaQuery } from 'react-responsive'
import { Localized } from "@fluent/react";
import { RailApp } from '../core'


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
export class ServerGroup extends RailApp {
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