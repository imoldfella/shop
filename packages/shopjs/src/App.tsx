import { Component, Suspense } from 'solid-js';
import { Layout } from "./components/layout/layout";
import { Router } from '@solidjs/router'
import { PageStateProvider } from './components/md/prevnext';

const App: Component = () => {
  return (
    <Router><PageStateProvider>
      <Layout />
      </PageStateProvider></Router>)
};

export default App;
