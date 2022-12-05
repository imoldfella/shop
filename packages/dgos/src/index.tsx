/* @refresh reload */
import { render } from 'solid-js/web'
import { Component, Suspense } from 'solid-js'
import './index.css'
import {Layout} from './layout'
import { initStore } from './store';

// @ts-ignore
import { hello } from '@datagrove/dglib'

const App: Component = () => {
  return (<main class='dark: text-white dark:bg-black'><Layout/></main>)
};

async function init() {
  console.log(hello())
  await initStore()
  render(() => <App />, document.getElementById('app') as HTMLElement)
}
init()