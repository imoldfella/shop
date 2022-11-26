import { Component, Suspense } from 'solid-js';
import { Layout } from "./components/layout/layout";
import { testLayout } from './components/layout/test';
import { Router } from '@solidjs/router'
import { PageStateProvider } from './components/content/prevnext';

const App: Component = () => {
  testLayout()
  return (
    <Suspense>
      <PageStateProvider><Router><Layout />
      </Router></PageStateProvider></Suspense>)
};

export default App;
