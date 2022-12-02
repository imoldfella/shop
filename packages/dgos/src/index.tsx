/* @refresh reload */
import { render } from 'solid-js/web'
import { Component, Suspense } from 'solid-js'
import './index.css'
import {Layout} from './layout'
import { initStore } from './store';

const App: Component = () => {
  return (<main class='dark: text-white dark:bg-black'><Layout/></main>)
};

async function init() {
  await initStore()
  render(() => <App />, document.getElementById('app') as HTMLElement)
}
init()