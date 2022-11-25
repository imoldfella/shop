import type { Component } from 'solid-js';
import { Layout } from "./components/layout/layout";
import { testLayout } from './components/layout/test';
import { Router } from '@solidjs/router'

const App: Component = () => {
  testLayout()
  return (<Router><Layout/>
    </Router>)
};

export default App;
