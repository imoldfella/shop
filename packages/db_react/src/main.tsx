import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toggle,Autocomplete,FloatingSearch} from '../lib'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (
    <div><FloatingSearch/></div>
  )
}