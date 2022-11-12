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
import { useWorld } from './world'
import { Split } from './splitter'
import { useIsMobile } from './hooks'
import { Rail } from './rail'
import { Localized } from '@fluent/react'


// in full screen mode this needs a close which closes the rail as well.
// drawers are typically sand boxed in in iframe, but we can have local ones
function LocalDrawer({ onClose }: { onClose?: () => void }) {
  const w = useWorld()
  const app = w.rail[w.railSelect]
  return (<aside className=" flex h-screen w-full flex-col overflow-y-auto   text-white bg-gray-900" >

    {/* search */}
    <div className="flex flex-row items-center border-gray-600 border rounded-lg m-4 ">
      <Localized id='find' attrs={{placeholder: true}} >
      <input className=' w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='@Find' />
      </Localized>

      {/* we need a search list here */}
      <XCircleIcon className='w-6 h-6 m-2 text-blue-600 hover:text-blue-400' onClick={onClose} />
     
      
    </div>

    {app.render()}
  </aside>)
}




export function Layout() {
  const world = useWorld()
  const rail = world.railSelect
  const setRail = (index: number)=> {
    // we need to change the world.
    world.update({
      railSelect: index
    })
  }
  const mobile = useIsMobile()

  // in mobile mode, open the rail+files together as a dialog.
  const [mobileShowServers, setMobileShowServers] = useState(false)
  // clicking a server toggles the showFiles, although that's overridden if mobile  
  const [desktopShowFiles, setDesktopShowFiles] = useState(true)
  //const [rail, setRail] = useState(0)
  const panning = false
  const [splitSize, setSplitSize] = useState(384)

  console.log(mobile ? "mobile" : "desktop", window.innerWidth)

  // we need to transition the 
  if (mobile) {
    const drawerWidth = "w-full"

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
            <Rail/>
            <LocalDrawer onClose={() => setMobileShowServers(false)} />
          </div>
        </Transition>
      </div>
    )
  }

  return (
    <div className='flex-row flex'>
      <div className={`flex w-20 h-full flex-row`}>
        <Rail/>
      </div>
      <Split contentOnly={!desktopShowFiles} initialPrimarySize={splitSize + 'px'}>
        <LocalDrawer onClose={() => { setDesktopShowFiles(false) }} />
      </Split>
    </div>
  )
}


// there a many mains, some are maps. pannable things shouldn't move when the drawer flys out.

/*
          <span className="sr-only">{item.name}</span>
          <item.icon className="h-6 w-6" aria-hidden="true" />
*/
// mobile = full screen. 
// 0,1
// hamburger needs to stay on the screen, possibly shrink
// top navbar needs to float. side context need to stay open on wide
// side menu needs to stay open on wide.
// probably a splitter when the menu is open.
// on big adaptive screens, the layout pushes

// full screen is handled outside layout?
// it depends on the server, which is probably a context, can we use the database?
/*
        <Main
          uiLeft={0}
          showDrawer={mobile ? () => { setMobileShowServers(true) } : undefined} />
        <Main
          uiLeft={0}
          showDrawer={mobile ? () => { setMobileShowServers(true) } : undefined} />

          onChange={(n: number) => {
            setRail(n);
            setDesktopShowFiles(true)
          }} value={rail} 

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