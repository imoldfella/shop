
//import bip39 from 'bip39'
import React, { useEffect, useState } from 'react'
import { WorldProvider, World, useWorld } from '../core'
import { Layout } from '../lib/layout'
import { AccountApp, } from '../account'
import { ServerGroup, } from '../server'
import { LoginDialog } from './loginpage'
import { OfflineWaiter } from './offlineWaiter'

// this probably needs to be separated out somehow?
export function LoginPage(props: React.PropsWithChildren<{}>) {
  const w = useWorld()

  if (w.publicMode) {
    return (<>{props.children}</>)
  } else if (w.login) {
    return (<>{props.children}</>)
  } else if (false && !w.ws) {
    return (<OfflineWaiter />)
  } else
    return (<LoginDialog />)
}

export function Datagrove() {
  return (
    <div className='fixed h-screen w-screen'>
      <WorldProvider>
        <LoginPage><Layout /></LoginPage>
      </WorldProvider>
    </div>
  )
}

// the public version of datagrove doesn't have a rail, and only browses a single branch or tag
const newWorld = {
  login: true,
  rail: [
    new AccountApp(),
    new ServerGroup({
      name: 'How should we live?',
      icon: new Uint8Array(0),
    }),
    new ServerGroup({
      name: 'Datagrove Users',
      icon: new Uint8Array(0),
    }),
    new ServerGroup({
      name: 'Costa Rica Traffic',
      icon: new Uint8Array
    }),

  ],
  locale: { id: 'es', label: 'Español' },
  locales: [
    { id: "es", label: "Español" },
    { id: "en", label: "English" }
  ]

}

// we should try to load the data from indexeddb somehow. 

export async function initialize(props?: {
  world: Partial<World>
}): Promise<void> {
  // try load the world from local storage.
  // maybe move this to indexeddb 
  let ws: WebSocket | undefined
  try {
    ws = await connect()
  } catch { }

  let init: Partial<World> = {}
  const s = localStorage.datagrove
  if (s) {
    init = JSON.parse(s) as Partial<World>
    // we have connected once, so now we can use offline.

  } else {
    // if we are offline then we are stuck here
    // if we can't get a websocket to the server we are stuck here
    init = {
      publicMode: true,
      focusApp: new ServerGroup({
        name: 'How should we live?',
        icon: new Uint8Array(0)
      })
    }
  }
  console.log("init", init)
  World.world = {
    ...World.world,
    ...init,
    ws: ws
  }
}

// Online state

function connect(): Promise<WebSocket> {
  return new Promise(function (resolve, reject) {
    var server = new WebSocket('ws://mysite:1234');
    server.onopen = function () {
      resolve(server);
    };
    server.onerror = function (err) {
      reject(err);
    };

  });
}
