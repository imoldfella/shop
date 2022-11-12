import {  RailApp, useWorld , Switch,Combo} from '..'
import React,{ useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

export class PrivateApp extends RailApp {
    fullScreen = false
    constructor() {
        super();
    }
    icon() {
        return (<Avatar />)
    }
    render() {
        const world = useWorld()
        const [enabled,setEnabled] = useState(true)
        return (
            <div className='w-full'>
            <Switch enabled={enabled} setEnabled={setEnabled} >
                Use system dark mode
            </Switch>
            <Combo items={world.locales} value={world.locale} />
            </div>
      )
    }
}

function Avatar() {
    return (<img
        className="inline-block h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
    />)
}


function ExamplePanning() {

}

function ExampleMain({ showDrawer }: { uiLeft?: number, showDrawer?: () => void }) {
  return (<main className="min-w-0 flex-1  border-gray-200 ">
    <div className="bg-white text-black shadow sm:rounded-lg  m-4 w-[372px]">
      <div className='flex items-center' >

        {showDrawer && <button className='h-6 w-6 m-2' onClick={showDrawer}><Bars3Icon className='text-black' /></button>}
        <input className='outline-none py-2 pl-3 pr-10 w-full focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a provider' />
      </div>
    </div>
    {/* Primary column */}
    <section
      aria-labelledby="primary-heading"
      className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto "
    >
      {/* Top nav*/}
      <h1 id="primary-heading" className="">


      </h1>
      {/* Your content */}
    </section>
  </main>)
}
class CreateServer extends RailApp {
    fullScreen = true
    icon() {
        return (<PlusIcon className='h-6 w-6 m-2' title='Create Server' />)
    }
    render() {
        return (<div>Add Server</div>)
    }
}
class FindServer extends RailApp {
    fullScreen = true
    icon() {
        return (<MagnifyingGlassIcon className='h-6 w-6 m-2' title='Find Server' />)
    }
    render() {
        return (<div>Find Server</div>)
    }
}
