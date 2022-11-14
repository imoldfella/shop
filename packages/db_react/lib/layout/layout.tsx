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
import { useWorld } from '../core/world'
import { Split } from '../splitter'
import { useIsMobile } from '../core/hooks'
import { Rail } from './rail'
import { Localized } from '@fluent/react'
import { Sidebar } from './sidebar'


export function Layout() {
  const world = useWorld()
  const rail = world.railSelect
  const setRail = (index: number) => {
    // we need to change the world.
    world.update({
      railSelect: index
    })
  }
  const mobile = useIsMobile()
  console.log("layout", mobile, world)

  // in mobile mode, open the rail+files together as a dialog.
  const [mobileShowServers, setMobileShowServers] = useState(false)
  // clicking a server toggles the showFiles, although that's overridden if mobile  
  //const [desktopShowFiles, setDesktopShowFiles] = useState(true)
  //const [rail, setRail] = useState(0)
  const panning = false
  const [splitSize, setSplitSize] = useState(384)

  console.log(mobile ? "mobile" : "desktop", window.innerWidth)
  const app = world.rail[world.railSelect]
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
            {!world.publicMode && <Rail />}
            <Sidebar />
          </div>
        </Transition>
      </div>
    )
  }

  return (
    <div className='flex-row flex'>
      {!world.publicMode && <div className={`flex w-20 h-full flex-row`}>
        <Rail />
      </div>}
      <Split contentOnly={!world.showSidebar} initialPrimarySize={splitSize + 'px'}>
        <Sidebar />
        {world.focusApp.renderMain()}
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