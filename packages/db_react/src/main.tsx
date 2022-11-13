import React from 'react'
import ReactDOM from 'react-dom/client'
import { World, Datagrove, initialize, ServerGroup, SettingsApp, AccountApp } from '../lib'
import './index.css'
import '../lib/css.css'



initialize().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Datagrove/>
    </React.StrictMode>
  )
})