/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

import { setSite, Page, SiteStore } from "./components/layout/store"
import { GUIDES_SECTIONS, REFERENCE_SECTIONS } from "./site/intro/site"

async function loadSite() {
    setSite({
        ...new SiteStore(),
        root: {
            name: '/',
            path: '/',
            children: [
                {
                    name: 'Guides',
                    // we shouldn't have a path to sections, we just pick the first child
                    children: GUIDES_SECTIONS,
                },
                {
                    name: 'Reference',
                    children: REFERENCE_SECTIONS,
                }
            ]
        },
        language: {
            en: 'English',
            es: 'Español',


        }})

    render(() => <App />, document.getElementById('root') as HTMLElement);
}


loadSite()
