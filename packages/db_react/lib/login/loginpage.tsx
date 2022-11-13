import React, { ChangeEvent, useState } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import { Logo } from './logo'
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { wordlist as spanish } from '@scure/bip39/wordlists/spanish';
import { Localized } from '@fluent/react';

//   <img
// className="mx-auto h-12 w-auto"
// src="https://datagrove.com/circle_wide_bars.svg"
// alt="Your Company"
// />

export function CreateAccount() {

}

// armor hood air permit borrow tunnel ostrich knock three inspire pattern chapter


export  function LoginDialog() {
    const [isCreate, setCreate] = useState(false)
    const [writeDown, setWriteDown] = useState(false)
    const [validBip39, setValidBip39] = useState(false)
    const [bip39tx, setBip39tx] = useState("")

    const validate = (x: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(x)
        setBip39tx(x.target.value)
        setValidBip39(bip39.validateMnemonic(x.target.value, wordlist))
    }

    const Submit = (props: {enable: boolean})=>(                <div>
        <button
          type="submit"
          disabled={!props.enable}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 disabled:text-gray-400"
        >
          Sign in
        </button>
      </div>)

    if (isCreate) {
      const   password = bip39.generateMnemonic(wordlist)

      return (<>

        <div className="flex text-black min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className='flex justify-center'>
                <div className='h-24 w-24'>
                    <Logo color='rgb(79 70 229)'/></div></div>
            <Localized id={isCreate?"create-account":"sign-in"}>
            <h2 className="mt-6 text-center text-white text-3xl font-bold tracking-tight">Sign in to your account</h2></Localized>


            <p className="mt-4 text-center  text-gray-600">
 
              
              <a href="#" onClick={()=>setCreate(false)} className="font-medium text-indigo-600 hover:text-indigo-500">
                signin existing account
              </a>
            </p>

             <p className="mt-2 text-center  text-gray-600">
              
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                continue as a guest
              </a>
            </p>           
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
              {isCreate &&<Localized id='explain-bip'>
                    <p>This BIP39 passphrase IS your identity. Print it, copy/paste it, write it on paper with pencil; whatever works for you. If you lose it, this identity is gone and any work associated with it.</p>
                    </Localized>}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    BIP39 pass phrase
                  </label>
                  <div className="mt-1">
                    
                    <textarea
                      id="password"
                      name="password"
                      defaultValue={password}
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
                 <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      onClick={(e)=>{setWriteDown(!writeDown)}}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      I wrote it down
                    </label>
                  </div>
                <div className="flex items-center justify-between">
 
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
     
                </div>
  
                <Submit enable={writeDown}/>
              </form>

          </div></div>
        </div>
      </>
    )

    }
    else return (
      <>

        <div className="flex text-black min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className='flex justify-center'>
                <div className='h-24 w-24'>
                    <Logo color='rgb(79 70 229)'/></div></div>
            <Localized id="sign-in">
            <h2 className="mt-6 text-center text-white text-3xl font-bold tracking-tight">Sign in to your account</h2></Localized>


            <p className="mt-4 text-center  text-gray-600">
 
              
              <a href="#" onClick={()=>setCreate(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                create account
              </a>
            </p>

             <p className="mt-2 text-center  text-gray-600">
              
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                continue as a guest
              </a>
            </p>           
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    BIP39 pass phrase
                  </label>
                  <div className="mt-1">
                    
                    <textarea
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      onChange={validate}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between">
 
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
     
                </div>
  
                <Submit enable={validBip39}/>
              </form>
              <div>
                <div className='text-center text-black mt-4'>
                Scan with Datagrove mobile to login
              </div>
              <div className='flex flex-row justify-center p-4' >
                <QRCodeSVG value="https://reactjs.org/" />,
              </div>
            </div>
          </div></div>
        </div>
      </>
    )
  }
  