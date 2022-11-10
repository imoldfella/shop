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
import { SearchComplete } from './search'

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
  { name: 'Drafts', href: '#', icon: PencilSquareIcon, current: false, },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


// mobile = full screen. 
// 0,1
export function Rail({ value, onChange }: { value: number, onChange: (x: number) => void }) {
  return (<nav aria-label="Sidebar" className=" flex border-r border-gray-200  flex-shrink-0 overflow-y-auto bg-gray-800">
    <div className="relative flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
      {sidebarNavigation.map((item, index) => (
        <a
          onClick={() => onChange(index)}
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

  </nav>)
}

// drawers are typically sand boxed in in iframe, but we can have local ones
function LocalDrawer() {
  return (<aside className="  block flex-shrink-0">
    <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-800 text-white" >
      {/* Your content */}
      <div className="bg-grey-900 border-gray-600 border rounded-lg  z-50 m-4 ">
      <div className=' text-black' >
        <input className='text-white   outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a conversation'/>

        {/* we need a search list here */}

      </div>
    </div>
    </div>
  </aside>)
}

// there a many mains, some are maps. pannable things shouldn't move when the drawer flys out.
function Main({onMenu}: {onMenu: ()=>void}) {
  return (<main className="min-w-0 flex-1  border-gray-200 ">
    <div className="bg-white text-black shadow sm:rounded-lg fixed z-50 m-4 w-[372px]">
      <div className='flex items-center' >
        <button className='h-6 w-6 m-2' onClick={onMenu}><Bars3Icon className='text-black'/></button> 
        <input className='outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a provider'/>
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
export function Layout() {
  // full screen mode has a fly over.
  const [show, setShow] = useState(2)
  const [rail, setRail] = useState(0)

  // showServers show if:
  // iframe mode and the iframe requests it
  // mobile and menu is open
  // desktop and not full screen
  "flex min-h-0 flex-1 overflow-hidden"
  return (
    <>
      <div className="flex h-full flex-row">
        {show > 0 && <Rail onChange={setRail} value={rail} />}
        {show == 2 && <LocalDrawer />}
        {rail>1 ? <iframe className="min-w-0 flex-1  border-gray-200 lg:flex" src='espn.com' /> : <Main onMenu={()=>{ setShow(show==0?2:0) }} />}
      </div>
    </>
  )
}


//                 <button onClick={() => setIframe(!iframe)}>{iframe ? "local" : "iframe"}</button><br />