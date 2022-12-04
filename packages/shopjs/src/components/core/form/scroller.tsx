
import React, { useEffect, useRef } from 'react'
import { ScrollerProps, Snapshot, Scroller as ScrollerTs } from '../../db/lib'
//import styled from 'styled-components'
export type { ScrollerProps, Snapshot }



export function Scroller<T>(props: ScrollerProps<T>) {
    const container = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (container.current) {
            const ts = new ScrollerTs(
                container.current,
                props
            )
            return () => ts.close()
        }
    })
    return (<div className={'scroll-container'} ref={container} />)
}
