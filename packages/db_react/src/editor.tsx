import React from 'react'
import ReactDOM from 'react-dom/client'
import { Datagrove, initialize } from '../lib'
import './index.css'
import '../lib/css.css'
import { GridLoader } from 'react-spinners'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'


// this needs to identify if we are are a public address
initialize().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Datagrove />
      <Spinner />
    </React.StrictMode>
  )
})

export const Spinner = (props: {}) => {
  const { promiseInProgress } = usePromiseTracker();

  const click = (x: any) => {
    x.stopPropagation()
    x.preventDefault()
    return true
  }
  return (
    promiseInProgress ? (
      <div onClick={click} className='fixed inset-0 h-screen w-screen z-50 bg-gray-600 bg-opacity-50 '>
        <div className="flex justify-center items-center h-screen">
          <GridLoader color="#36d7b7" />
        </div>
      </div>
    ) : (<></>)
  )
}

/*
function App() {
  trackPromise(wait(10000)).then(()=>{ console.log("done")})
  return (<button onClick={async ()=>alert("??")}>click me</button>)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
    <Spinner/>



  </React.StrictMode>
)*/
