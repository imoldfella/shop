import React from 'react'
import ReactDOM from 'react-dom/client'
import { World, Layout, WorldProvider, initialize, ServerGroup, SettingsApp, AccountApp } from '../lib'
import './index.css'
import '../lib/css.css'

export async function initializeTest() {
  const testWorld: Partial<World> = {
    rail: [
      new AccountApp(),
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
    locale: { id: 'es', label: 'Español' },
    locales: [
      { id: "es", label: "Español" },
      { id: "en-US", label: "English" }
    ]

  }
  await initialize({ world: testWorld })

}

initializeTest().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <div className='fixed h-screen w-screen'>
        <WorldProvider>
          <Layout></Layout>
        </WorldProvider>
      </div>
    </React.StrictMode>
  )
})