
//import bip39 from 'bip39'
import React,{} from 'react'
import {WorldProvider,Layout, AccountApp, ServerGroup, World, useWorld} from '..'

import { LoginDialog } from './loginpage'

// this probably needs to be separated out somehow?
export function LoginPage(props: React.PropsWithChildren<{}>) {
  const w = useWorld()
  return (<div>
    {w.login? props.children:LoginDialog()}
  </div>)
}

export function Datagrove(){
    return (
        <div className='fixed h-screen w-screen'>
        <WorldProvider>
          <LoginPage><Layout/></LoginPage>
        </WorldProvider>
      </div>
    )
}



// we should try to load the data from indexeddb somehow. 

export async function initialize(props?: {
  world: Partial<World>
}): Promise<void> {
  // try load the world from local storage.
  // maybe move this to indexeddb 

  let init: Partial<World> = {}
  const s = localStorage.datagrove
  if (s) {
      init = JSON.parse(s) as Partial<World>
  } else {
      init = {
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
            icon: new Uint8Array
          }),

        ],
        locale: { id: 'es', label: 'Español' },
        locales: [
          { id: "es", label: "Español" },
          { id: "en", label: "English" }
        ]

      } 
  }

  World.world = {
      ...World.world,
      ...init
  }
  // this should be guest | logged out | logged in.
  let loggedin = false;
  if (loggedin) {

  } else {

  }
}