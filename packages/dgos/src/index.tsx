/* @refresh reload */
import { render } from 'solid-js/web'
import { Component, Suspense } from 'solid-js'
import { Router } from '@solidjs/router'
import './index.css'
import { Layout } from './layout'
import { initStore } from './store';
import { DbcProvider, openDatabase, MediaProvider } from './dglib';


// to make bookmarks work we will need to push the route up through the iframe
async function init() {
  const dbc = await openDatabase()
  render(() =>
  (<MediaProvider><Suspense>
    <Router>
      <DbcProvider db={dbc}>
        <Layout />
      </DbcProvider>
    </Router>
  </Suspense ></MediaProvider>), document.getElementById('app') as HTMLElement)
}
init()
