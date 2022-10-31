import React, { useReducer, useState, Suspense, useMemo, useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../../map/lib/map.css'
import { Mapgl, Marker, MapPosition, MapClick, MapSearch, } from '../lib/main'
import { ErrorBoundary } from './error'
import { createDatabase } from '../../db-react/lib/main'
import { Database } from '@datagrove/db'
import 'intl-polyfill';
import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { LocalizationProvider, ReactLocalization } from '@fluent/react';

// in general things that query the database should be suspendable

// db is going to be a global, it will have to initialize itself
// we can use db without logging in to get access to public databases.

// we should move this into a database table
interface ResourceMap  {
   [key: string]: FluentResource
}
const RESOURCES :  ResourceMap = {
  'es': new FluentResource('hello = Hola !'),
  'en-US': new FluentResource('hello = Hello, world!'),
};
// A generator function responsible for building the sequence 
// of FluentBundle instances in the order of user's language
// preferences.
function* generateBundles(userLocales: readonly string[]) {
  // Choose locales that are best for the user.
  const currentLocales = negotiateLanguages(
      userLocales,
      [ 'en-US', 'es'],
      { defaultLocale: 'en-US' }
  );

  for (const locale of currentLocales) {
      const bundle = new FluentBundle(locale);
      bundle.addResource(RESOURCES[locale]);
      yield bundle;
  }
}

// The ReactLocalization instance stores and caches the sequence of generated
// bundles. You can store it in your app's state.
let l10n = new ReactLocalization(generateBundles(navigator.languages));


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='w-screen h-screen'>
      <App />
    </div>
  </React.StrictMode>
)
// each app needs a database provider
const db = createDatabase()

function App() {
  return (<ErrorBoundary fallback={<p>Could not fetch data.</p>}>
      <Suspense>
        <MapSearch options={options}/>
      </Suspense>
    </ErrorBoundary>)
}

const options = {
  buttons: [
    [ "svg", "text"]
  ]
}




// equivalent to a prepared statement. h

// generate a hook? generate better  code for queries with no parameters?
// calls read, throws suspended.
// in some cases it might be fine to provide the query with a default value like []?
// in this case it would never throw suspend.
// q = useQueryX(db, 1,2)  - can we deal with a structured/parquet result?

// tx = db.begin()
// proc1(tx,  )
// tx.commit()
// use something like this to 
// const db = useDb()
// watchmarkers = useQuery(db," ")

// marker at current location

// we can watch the geolocation 

// the database can generate this prepare right away, and know if it needs to suspend. parameters can be memoized. we could probably use this in with useMemo?
// this use here is a little slow because we need to recompute fetchShows each time.
// also required that it be memoized; how do we then release it?
// fetchShows could increment reference? return 
// const a =  useMemo(()=>{ return 3}, [3])
// const list = fetchShows(db,3).read()

// useEffect doesn't return anything.
// can we call it from read?
// useEffect(()=>{
//   // 
//   // cleanup.
//   return ()=>{}
// })





/*
  const [search, setSearch] = useState("")

  // based on the search we may need to update the markers.
  const m: Marker[] = [

  ]

  const [state, setState] = useState({
    markers: m
  })

  const onchange = (pos: MapPosition) => {
    setState((state) => {
      return {
        ...state,
        pos
      }
    })
  }
  const onclick = (pos: MapClick) => {

  }
  // should this be controlled, immutable? should we send back the scroll as notification or request?
    <div>
      <Mapgl
        options={state}
        onChange={onchange}
        onClick={onclick}
        className='w-screen h-screen'></Mapgl>
    </div>)
const reducer = (state: number,action: number ):number=>{
  return state
}
const [state,dispatch] = useReducer(reducer, 0)
*/