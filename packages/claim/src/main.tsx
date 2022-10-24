import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ClaimsProvider} from '../lib/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ClaimsProvider><App /></ClaimsProvider>
  </React.StrictMode>
)
