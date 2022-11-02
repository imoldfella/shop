import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Example } from '../lib/main'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (<div>
    <Example /><p className='bg-slate-500'>hello, world</p></div>)
}