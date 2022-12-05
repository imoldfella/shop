/* @refresh reload */
import { render } from 'solid-js/web';
import { Component, Suspense } from 'solid-js';
import { Layout } from "./components/layout/layout";
import { Router } from '@solidjs/router'
import { PageStateProvider } from './components/md/prevnext';
import { setSite, Page, SiteStore } from "./components/layout/store"
import { siteStore } from "./site/intro/site"
import './index.css';

// maybe layout should create the signal? maybe it should be deferred?
const App: Component = () => {
    return (
        <Router><PageStateProvider>
            <Layout />
        </PageStateProvider></Router>)
};


// we should store the language preference and load it here.
async function loadSite() {
    setSite(siteStore, '') // empty string means pick based on browser or previous choice?
    render(() => <App />, document.getElementById('root') as HTMLElement);
}
loadSite()
