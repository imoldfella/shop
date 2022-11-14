import { Localized } from '@fluent/react'
import React,{} from 'react'
import {Logo} from './logo'

// this should only happen in rare circumstances.
export function OfflineWaiter(){
      return (<div className="flex text-black min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className='flex justify-center'>
            <div className='h-24 w-24'>
              <Logo color='rgb(79 70 229)' /></div></div>
          <Localized id='offline'>
            <h2 className="mt-6 text-center text-white text-3xl font-bold tracking-tight">Unable to connect</h2></Localized>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
           
               <Localized id='explain-offline'>
                <p>You can use Datagrove offline, but you first must connect while you are online</p>
              </Localized>



              </div>

          </div></div>)
}
