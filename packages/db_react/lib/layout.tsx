import React, { Fragment, useState } from 'react'
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
import { RailItem, useWorld } from './world'
import { Split } from './splitter'
import { useIsMobile } from './hooks'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/*
          <span className="sr-only">{item.name}</span>
          <item.icon className="h-6 w-6" aria-hidden="true" />
*/
// mobile = full screen. 
// 0,1
export function Rail({ items, value, onChange }: {
  items: RailItem[],
  value: number,
  onChange: (x: number) => void
}) {
  const world = useWorld()

  return (<nav aria-label="Sidebar" className=" h-screen flex border-r border-gray-200  flex-shrink-0 overflow-y-auto bg-gray-800">
    <div className="flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
      {world.rail.map((item, index) => (
        
        <a
          onClick={() => onChange(index)}
          key={item.name}
          href={item.href}
          className={classNames(
            value == index ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
            'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
          )}
        >
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        </a>
      ))}
    </div>

  </nav>)
}

// in full screen mode this needs a close which closes the rail as well.
// drawers are typically sand boxed in in iframe, but we can have local ones
function LocalDrawer({ onClose}: {onClose?: ()=>void }) {

  return (<aside className=" flex h-screen w-full flex-col overflow-y-auto   text-white bg-gray-900" >

      {/* search */ }
      <div className="flex flex-row items-center border-gray-600 border rounded-lg m-4 ">
        <input className=' w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a conversation' />

        {/* we need a search list here */}
        <XCircleIcon className='w-6 h-6 m-2 text-blue-600 hover:text-blue-400' onClick={onClose} />

      </div>
  </aside>)
}

// there a many mains, some are maps. pannable things shouldn't move when the drawer flys out.

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

// hamburger needs to stay on the screen, possibly shrink
// top navbar needs to float. side context need to stay open on wide
// side menu needs to stay open on wide.
// probably a splitter when the menu is open.
// on big adaptive screens, the layout pushes

// full screen is handled outside layout?
// it depends on the server, which is probably a context, can we use the database?


export function Layout() {
  const world = useWorld()
  const mobile = useIsMobile()

  // in mobile mode, open the rail+files together as a dialog.
  const [mobileShowServers, setMobileShowServers] = useState(false)
  // clicking a server toggles the showFiles, although that's overridden if mobile  
  const [desktopShowFiles, setDesktopShowFiles] = useState(true)
  const [rail, setRail] = useState(0)
  const panning = false
  const Main = ExampleMain
  const [splitSize, setSplitSize] = useState(384)

  console.log(mobile?"mobile":"desktop", window.innerWidth)

  // we need to transition the 
  if (mobile) {
    const drawerWidth =  "w-full" 

    return (
    <div className='flex-row flex'>
      <Transition show={mobileShowServers}
        as={Fragment}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className={`flex w-screen fixed z-50 h-full flex-row`}>
          <Rail items={world.rail} onChange={setRail} value={rail} />
          <LocalDrawer onClose={()=>setMobileShowServers(false)}/>
        </div>
      </Transition>
      <Main
        uiLeft={0}
        showDrawer={mobile ? () => { setMobileShowServers(true) } : undefined} />
    </div>
  )
}


return (
  <div className='flex-row flex'>
     <div className={`flex w-20 h-full flex-row`}>
      <Rail items={world.rail} 
        onChange={(n:number)=> { 
            setRail(n); 
            setDesktopShowFiles(true)
            }} value={rail} />
    </div>
    <Split contentOnly={!desktopShowFiles} initialPrimarySize = { splitSize+'px' }>
    <LocalDrawer onClose={()=>{setDesktopShowFiles(false)} } />
    <Main
      uiLeft={0}
      showDrawer={mobile ? () => { setMobileShowServers(true) } : undefined} />
    </Split>
  </div>
)
}


/*

      <Transition show={showServers}
        as={Fragment}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
   {iframe ? <iframe className="min-w-0 flex-1  border-gray-200 lg:flex" src='https://datagrove.com' /> :     


<button onClick={() => setIframe(!iframe)}>{iframe ? "local" : "iframe"}</button><br />

// we need some kind of apply that in general is included in the context.
*/