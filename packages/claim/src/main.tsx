import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ClaimsProvider } from '../lib/store'
import './index.css'

async function main() {
  // do asynchronous things to initialize the desired Payor, through custom code or payor.json

  // load the most recent cart state.


  // initialize a plan document from 
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ClaimsProvider><App /></ClaimsProvider>
    </React.StrictMode>
  )
}
main()
