/* @refresh reload */
import { render } from 'solid-js/web'
import { Suspense } from 'solid-js'
import { Router } from '@solidjs/router'
import './index.css'
import { DbProvider, MediaProvider, BranchMap } from './dglib/gui'
import { createDb } from './dglib/db/client'


// to make bookmarks work we will need to push the route up through the iframe
async function init() {
  // we can await our database here, then hand it to Provider
  const db = await createDb()
  render(() =>
  (<MediaProvider><Suspense>
    <Router>
      <DbProvider value={db}>
        <BranchMap />
      </DbProvider>
    </Router>
  </Suspense ></MediaProvider>), document.getElementById('app') as HTMLElement)
}
init()
