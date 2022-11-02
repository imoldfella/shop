import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Autocomplete,Toggle } from '../lib'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (<div>
    WTF??<Toggle/>??WTF
  
   </div>)
}