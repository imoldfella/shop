
import React, { } from 'react'
import { Localized } from '@fluent/react'
import { MagnifyingGlassIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { RailApp, useWorld } from './world'

export function ServerSearch() {
    const w = useWorld()

    const close = () => {
        w.update({
            showFiles: false
        })
    }

    {/* search */ }
    return (<div className="flex flex-row items-center border-gray-600 border rounded-lg m-4 ">
        <Localized id='find' attrs={{ placeholder: true }} >
            <input className=' w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='@Find' />
        </Localized>

        {/* we need a search list here */}
        <XCircleIcon className='w-6 h-6 m-2 text-blue-600 hover:text-blue-400' onClick={close} />


    </div>)
}

// this has to be a list like rail, but not global
// it has a list of apps and folders and renders in the third pane,

// documents may be folders, in which case the only open in the drawer, and not in the main area.
// folders

// directories need sticky. the
class Directory {
    sticky: File[] = []
    file: File[] = []
}
class Server {
    root: Directory = new Directory()
}
class SimpleDirectory {
}
export function ServerTree(props: {
    server: Server
}) {
    const w = useWorld()

    return (<div> tree </div>)
}

