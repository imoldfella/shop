import React, { Fragment, ReactPropTypes, useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import {

    XCircleIcon
} from '@heroicons/react/24/outline'
import { useMediaQuery } from 'react-responsive'
import { Localized } from "@fluent/react";
import { RailApp, useWorld } from '../core'
import { SidebarSearch } from '../lib/layout'


function Wip() {
    return (<b>Work in progress</b>)
}

class SidebarPanel {

    render() {
        return (<Wip />)
    }
}
// unclear if this can be completely rendered as html, in most cases we would want to do this? really large toc can't be though and how would you search that?
function PublicToc() {

    // not a file sytem, but similar idea
    return (<ul>
        <li>one</li>
    </ul>)
}

// in full screen mode this needs a close which closes the rail as well.
// drawers are typically sand boxed in in iframe, but we can have local ones
function PublicSidebar({ onClose }: { onClose?: () => void }) {
    // sidebar is a set of panels. one pane is files, another is toc, another is open
    // public mode is only open
    return (<aside className=" flex h-screen w-full flex-col overflow-y-auto   text-white bg-gray-900" >
        <SidebarSearch />
        <PublicToc />

    </aside>)
}

function ServerSidebar() {
    return (<Wip />)
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
        const w = useWorld()
        if (w.publicMode)
            return <PublicSidebar />
        else return (<ServerSidebar />)
    }
    renderMain(): JSX.Element {
        return super.renderMain()
    }
    constructor(props: ServerGroupProps) {
        super()
    }

}