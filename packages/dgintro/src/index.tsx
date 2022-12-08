/* @refresh reload */
import { render } from 'solid-js/web';
import { Component, Suspense } from 'solid-js';
import { Router } from '@solidjs/router'

import { siteStore } from "./site"
import './index.css';

import { setSite, Layout, Hello } from "@datagrove/dglib"

// is this site just a test harness? seems like the bootstrap program can just be a string, is it built from this though?
// maybe layout should create the signal? maybe it should be deferred?
// each site will be 1 admin + n code branches + 0,1 public database + N concierge sites. Each concierge site has its set of readers and writers. each concierge site specifies its own snapshot (snapshot = branch.time) for the code
// we need to inject admin features into each site, we can turn these on/off from an injected preference
const App: Component = () => {
    return (<Router>
        <div><Hello name={'jim'}>
            <div>Welcome!</div>
        </Hello>
        </div>
    </Router>)
};


// we should store the language preference and load it here.

if (false) {
    async function loadSite() {
        setSite(siteStore, '') // empty string means pick based on browser or previous choice?
        render(() => <App />, document.getElementById('root') as HTMLElement)
    }
    loadSite()

} else {
    render(() => <App />, document.getElementById('root') as HTMLElement)
}
