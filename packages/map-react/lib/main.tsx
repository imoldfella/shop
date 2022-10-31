export * from '../../map/lib/main'
import React, {ReactNode, useEffect, useRef, useState} from 'react'
import { mountDgMap, MapGl,MapClick, MapPosition } from '../../map/lib/main'

// we need a good method of overlaying markers etc.
// we need a way to center the map on the current location.
// we need some kind of call back as the user scrolls
// we need a way to send markers.

export  function Mapgl(props: {
    className?: string, 
    options?: {}
    onClick?: (a: MapClick)=>void
    onChange?: (a: MapPosition)=>void
}){
    const mContainer = useRef<HTMLDivElement>(null);
    const m = useRef<MapGl>(null)
    useEffect(() => {
        if (m.current) return
        mountDgMap(mContainer.current!)
    })
    return (
        <div  className={props.className} >
            <div ref={mContainer} className="map"/>
        </div>)

}

export function Card(props: {children?: ReactNode}) {
    return (<div className='rounded border-gray-400'>
      {props.children}
    </div>)
  }


// a search option is a search string and a 
export interface SearchButton {
    query: string,
    children: ReactNode
}
export interface SearchOptions {
    buttons: SearchButton[]
}
export function MapSearch(props: {
    options?: SearchOptions
    near?: [number,number] //  by default will use current location
}){
    const [search,setSearch] = useState("")

    const b : ReactNode[] = props.options?.buttons.map(e => { 
        return (<button onClick={()=>setSearch(e.query)}>{e.children}</button>)
    })??[]

    return (
        <div>
        <Mapgl/>
        <div className='z-10 fixed p-4'>
            <Card><input placeholder='search' 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}} />
                    </Card>     
            {b}
            
        </div>
        </div>
    )
}

