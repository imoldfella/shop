import React, { useReducer, useState, Suspense, useMemo, useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../../db/lib/map.css'
import {createDatabase, ResourceMap, ErrorBoundary MapSearch, SearchOptions } from '../lib'
import 'intl-polyfill';
import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { LocalizationProvider, Localized, ReactLocalization } from '@fluent/react';
import { BeakerIcon } from '@heroicons/react/24/solid'

// in general things that query the database should be suspendable

// db is going to be a global, it will have to initialize itself
// we can use db without logging in to get access to public databases.

// we should move this into a database table

const RESOURCES: ResourceMap = {
  'es': new FluentResource(`hello = Hola !
pharmacy = Farmacia
  
  `),
  'en-US': new FluentResource(`hello = Hello, world!

pharmacy = Pharmacy

beaker = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
</svg>

`),
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='w-screen h-screen'>
      <App />
    </div>
  </React.StrictMode>
)
// each app needs a database provider
const db = createDatabase()

// maybe these should be 
const options: SearchOptions = {
  buttons: [
    ["provider", "beaker", "pharmacy"]
  ]
}

// we could do the suggestion engine in dart
// we might like our suggestor to be sync if possible, or maybe a stream?
// we might like to have the list update, as a query might.
async function suggestor(s: string): Promise<string[]>{
  return []
}
// maybe should return html?
// maybe it should take a call back so it can keep streaming results.
// 
async function searcher(s: string): Promise<ReactNode[]>{
  return []
}

// maybe instead 
function App() {
  // we need to define how search will happen and provide a result list
  const [search,setSearch] = useState("")
  const [found,setFound]  = useState<ReactNode[]>([])
  const [suggest,setSuggest] = useState<string[]>([])
  // calls the suggester each time the 
 
  const commit = ()=> searcher(search).then((r)=> setFound(r))
  const update = (s:string) => {
    setSearch(search)
    suggestor(s).then((e)=>setFound(e))
    setSuggest([])
  }

  // the search display is going to be scrollable, virtual
  return (<ErrorBoundary fallback={<p>Could not fetch data.</p>}>
    <Suspense>
      <MapSearch 
        options={options}
        found={found}
        setSearch={update}
        suggest={suggest}
        />
    </Suspense>
  </ErrorBoundary>)
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