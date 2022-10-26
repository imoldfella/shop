import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// maybe there should be a map provider here, then any control can access the map?
// maybe there should be a database context here, then give a database reference to the map control?

// how do we pass identity to the database?
// we need some 


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
