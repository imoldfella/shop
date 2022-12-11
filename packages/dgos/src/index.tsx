/* @refresh reload */
import { render } from 'solid-js/web'
import { Suspense } from 'solid-js'
import { Router } from '@solidjs/router'
import './index.css'
import { DbProvider, openDatabase, MediaProvider, BranchMap } from './dglib';


// to make bookmarks work we will need to push the route up through the iframe
async function init() {

  render(() =>
  (<MediaProvider><Suspense>
    <Router>
      <DbProvider>
        <BranchMap />
      </DbProvider>
    </Router>
  </Suspense ></MediaProvider>), document.getElementById('app') as HTMLElement)
}
init()
