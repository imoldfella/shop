/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

import { setSite, Page, SiteStore } from "./components/layout/store"
import { siteStore } from "./site/intro/site"

// we should store the language preference and load it here.
async function loadSite() {
    setSite(siteStore, '') // empty string means pick based on browser or previous choice?

    render(() => <App />, document.getElementById('root') as HTMLElement);
}


loadSite()
