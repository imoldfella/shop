import { faker } from '@faker-js/faker'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toggle, Autocomplete, FloatingSearch, Scroller, ScrollerProps, Snapshot, FloatingSearchHeader } from '../lib'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


function App() {
  let count=0
  const chats = [...new Array(100)].map(e => count++ + ". " + faker.lorem.paragraph()) 

  return (
    <div className='fixed h-screen w-screen'>
      <FloatingSearchHeader/>
      <div className={'search-results'} >
        <Scroller items={chats}  />
      </div>
    </div>
  )
}





