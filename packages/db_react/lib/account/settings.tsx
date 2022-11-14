import { Switch, Avatar, Combo } from '../form'
import { } from '../layout'
import { RailApp, useWorld,  LabeledId} from '../core'

import React, { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Localized } from '@fluent/react';

export class SettingsApp extends RailApp {
  fullScreen = false
  constructor() {
    super();
  }
  icon() {
    return (<Avatar />)
  }


  render() {
    const world = useWorld()
    const setEnabled = (x: boolean) => {
      world.update({
        systemDark: x
      })
    }
    return (
      <div className='w-full'>
        <Switch enabled={world.systemDark} setEnabled={setEnabled}
        >
          <Localized id='dark-mode'>System dark mode</Localized>
        </Switch>

        <Combo items={world.locales} value={world.locale} onChange={
          (x: LabeledId) => {
            world.update({ locale: x })
          }
        } ><Localized id='language'>Language</Localized></Combo>
      </div>
    )
  }
}



function ExamplePanning() {

}

function Scaffold(props: { uiLeft?: number, showDrawer?: () => void }) {

  return (<main className="min-w-0 flex-1  border-gray-200 ">
    <div className="bg-white text-black shadow sm:rounded-lg  m-4 w-[372px]">
      <div className='flex items-center' >

        {props.showDrawer && <button className='h-6 w-6 m-2' onClick={props.showDrawer}><Bars3Icon className='text-black' /></button>}
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

