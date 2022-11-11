import { Fragment, useState } from 'react'
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


// mobile = full screen. 
// 0,1
export function Rail({ value, onChange }: { value: number, onChange: (x: number) => void }) {
  return (<nav aria-label="Sidebar" className=" flex border-r border-gray-200  flex-shrink-0 overflow-y-auto bg-gray-800">
    <div className="relative flex flex-col flex-shrink-0 w-20 space-y-3 p-3">
      {server.map((item, index) => (
        <a
          onClick={() => onChange(index)}
          key={item.name}
          href={item.href}
          className={classNames(
            value == index ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
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

// in full screen mode this needs a close which closes the rail as well.
// drawers are typically sand boxed in in iframe, but we can have local ones
function LocalDrawer({ }: {}) {
  return (<aside className="  h-screen block flex-shrink-0">
    <div className="relative flex h-full w-full flex-col overflow-y-auto border-r border-gray-200 bg-gray-800 text-white" >
      <div className="bg-grey-900 text-black flex flex-row items-center border-gray-600 border rounded-lg m-4 ">

        <input className='text-white w-full  outline-none py-2 pl-3 pr-10  focus:ring-transparent sm:text-sm bg-transparent' placeholder='Find a conversation' />

        {/* we need a search list here */}
        <XCircleIcon className='w-6 h-6 m-2 text-blue-600' onClick={() => { }} />

      </div>
    </div>
  </aside>)
}

// there a many mains, some are maps. pannable things shouldn't move when the drawer flys out.
function Main({ onMenu }: { onMenu: () => void }) {
  return (<main className="min-w-0 flex-1  border-gray-200 ">
    <div className="bg-white text-black shadow sm:rounded-lg  m-4 w-[372px]">
      <div className='flex items-center' >
        <button className='h-6 w-6 m-2' onClick={onMenu}><Bars3Icon className='text-black' /></button>
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
function renderDiscuss() {
  return (<b>discuss</b>)
}
function renderMap() {
  return (<b>Map</b>)
}

interface App {
  panning: boolean
  icon: (x: any) => JSX.Element
  render: (x: any) => JSX.Element
}
const appDiscuss: App = {
  panning: false,
  icon: CircleStackIcon,
  render: renderDiscuss
}
const appMap: App = {
  panning: true,
  icon: ChevronDownIcon,
  render: renderMap
}
const apps: AppRegistry = {
  appDiscuss, appMap
}

export function Layout() {

  const [showServers, setShowServers] = useState(true)
  const [showFiles, setShowFiles] = useState(true)
  const [server, setServer] = useState(0)

  // each server has a server list
  const [app, setApp] = useState(appDiscuss)
  // panning mode has a fly over.
  // small screens have a route over.
  const [panning, setPanning] = useState(false)

  let iframe = false

  // if narrow then showServers implies showFiles, and both show over the editor

  // if 


  // !wide => fullover

  // showServers show if:
  // iframe mode and the iframe requests it
  // mobile and menu is open
  // desktop and not full screen
  "flex min-h-0 flex-1 overflow-hidden"

  const isWide = useMediaQuery({
    query: '(min-width: 600px)'
  })
  let w = "w-0";
  if (showServers) {
    if (isWide) {
      w = showFiles ? "w-96" : "w-20";
    } else {
      w = showServers ? "w-full" : "w-0";
    }
  }



  return (
    <> // fly over, maybe full over? how to do that?
      <Transition show={showServers}
        as={Fragment}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className={`flex ${w} h-full flex-row`}>
          <Rail onChange={setServer} value={server} />
          {showFiles && <LocalDrawer />}
        </div></Transition>

      {iframe ? <iframe className="min-w-0 flex-1  border-gray-200 lg:flex" src='https://datagrove.com' /> : <Main onMenu={() => { setShowServers(!showServers) }} />}
    </>
  )
}


//                 <button onClick={() => setIframe(!iframe)}>{iframe ? "local" : "iframe"}</button><br />