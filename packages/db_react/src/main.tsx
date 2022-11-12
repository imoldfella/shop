import { faker } from '@faker-js/faker'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toggle, Autocomplete, FloatingSearch, Scroller, ScrollerProps, Snapshot, FloatingSearchHeader, World, Layout, WorldProvider, initialize, ServerGroup, PrivateApp } from '../lib'
import './index.css'
import '../lib/css.css'
import { AppLocalizationProvider } from "../lib/l10n"

export async function initializeTest() {
  const testWorld: Partial<World> = {
    rail: [
      new PrivateApp(),
      new ServerGroup({
        name: 'How should we live?',
        icon: new Uint8Array(0),
      }),
      new ServerGroup({
        name: 'Datagrove Users?',
        icon: new Uint8Array(0),
      }),
      new ServerGroup({
        name: 'Costa Rica Traffic',
        icon: new Uint8Array(0),
      }),

    ],
    locale: 'es',
    locales: [
      { id: "es", label: "Spanish"},
      { id: "en-US", label: "English" }
    ]
    
  }
  await initialize({ world: testWorld })

}

initializeTest().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <div className='dark fixed h-screen w-screen'>
          <WorldProvider>
            <Layout></Layout>
          </WorldProvider>
        </div>
    </React.StrictMode>
  )
})