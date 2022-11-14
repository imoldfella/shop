import { XCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useWorld } from '../core'

// side bar can be either toc or file list
// public sidebar is toc
export function Sidebar() {
    const world = useWorld()
    return (<aside className=" flex h-screen w-full flex-col overflow-y-auto " >
        {world.focusApp.render()}
    </aside>)
}

export function SidebarSearch(props: {

}) {
    const w = useWorld

    const closeSidebar = () => {

    }

    return (<div className="flex flex-row items-center border-gray-600 border rounded-lg m-4 ">
        <input className=' w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a conversation' />

        {/* we need a search list here */}
        <XCircleIcon className='w-6 h-6 m-2 text-blue-600 hover:text-blue-400' onClick={closeSidebar} />

    </div>)
}
