import { faker } from '@faker-js/faker'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toggle, Autocomplete, FloatingSearch, Scroller, ScrollerProps, Snapshot, FloatingSearchHeader } from '../lib'
import './index.css'
import '../lib/css.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {

  return (
    <div className='dark fixed h-screen w-screen'>
      <FloatingSearch/> 
    </div>
  )
}





