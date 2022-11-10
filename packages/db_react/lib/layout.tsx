import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { FloatingSearch, FloatingSearchHeader } from './search'

const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]

// this needs to be a parameter, menu at the top, then context.
const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveBoxIcon, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: NoSymbolIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilSquareIcon, current: false,  },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// mobile = full screen. 

// hamburger needs to stay on the screen, possibly shrink
// top navbar needs to float. side context need to stay open on wide
// side menu needs to stay open on wide.
// probably a splitter when the menu is open.
// on big adaptive screens, the layout pushes
export function Layout() {
    // full screen mode has a fly over.
  const [full, setFull] = useState(false)
  const [iframe, setIframe] = useState(false)
  
  function setName(name: string){
    if (name!="Open"){
        setIframe(true)
    } else {
        setIframe(false)
    }

  }
  // showServers show if:
  // iframe mode and the iframe requests it
  // mobile and menu is open
  // desktop and not full screen

  return (
    <>
      <div className="flex h-full flex-col">


        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Narrow sidebar, part of the flyout on mobile and on full screen */}
          {!full &&
            <nav aria-label="Sidebar" className=" flex md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800">
              <div className="relative flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
                {sidebarNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                      'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
              {!iframe && <aside className=" order-first block flex-shrink-0">
                <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                  {/* Your content */}
                  <FloatingSearchHeader onMenu={()=>setFull(!full)}/>
                </div>
              </aside>}
            </nav>}

          {/* Main area */}
          { !iframe && <main className="min-w-0 flex-1  border-gray-200 lg:flex">
            <FloatingSearchHeader onMenu={()=>setFull(!full)}/>

            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              {/* Top nav*/}
              <h1 id="primary-heading" className="">


              </h1>
              {/* Your content */}
            </section>
        </main> }

          
          { iframe && <iframe className="min-w-0 flex-1  border-gray-200 lg:flex" src='espn.com'>

          </iframe> }
          
        </div>
      </div>
    </>
  )
}


//                 <button onClick={() => setIframe(!iframe)}>{iframe ? "local" : "iframe"}</button><br />