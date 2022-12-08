export * from '../../../map/lib/main'
import { Localized } from '@fluent/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { mountDgMap, MapGl, MapClick, MapPosition } from '../../../map/lib/main'


// we need a good method of overlaying markers etc.
// we need a way to center the map on the current location.
// we need some kind of call back as the user scrolls
// we need a way to send markers.

export function Mapgl(props: {
    className?: string,
    options?: {}
    onClick?: (a: MapClick) => void
    onChange?: (a: MapPosition) => void
}) {
    const mContainer = useRef<HTMLDivElement>(null);
    const m = useRef<MapGl>(null)
    const ox = useRef(true)
    useEffect(() => {
        if (m.current) return
        ox.current = false
        mountDgMap(mContainer.current!)
    })
    return (
        <div className={props.className} >
            <div ref={mContainer} className="map" />
        </div>)

}

export function Card(props: { children?: ReactNode }) {
    return (<div className='rounded border-gray-400'>
        {props.children}
    </div>)
}


export interface SearchOptions {
    buttons: [string, string, string][]
}
export function MapSearch(props: {
    options?: SearchOptions
    found: ReactNode[]
    suggest: string[]
    setSearch: (x: string)=>void
    near?: [number, number] //  by default will use current location
}) {
    const [search, setSearch] = useState("")

    const b: ReactNode[] = props.options?.buttons.map(e => {
        let [search, icon, text] = e
        return (<button onClick={() => setSearch(search)}>
            <Localized id={icon}>
                <svg /></Localized>
            <Localized id={text}>
                <span /></Localized></button>)
    }) ?? []

    return (
        <div>
            <Mapgl />
            <div className='z-10 fixed p-4'>
                <Card><input placeholder='search'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }} />
                </Card>
                {b}

            </div>
        </div>
    )
}

