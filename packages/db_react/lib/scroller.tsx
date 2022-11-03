
import React, { useEffect, useRef } from 'react'
import { ScrollerProps, Snapshot, Scroller as ScrollerTs } from '../../db/lib'
import styled from 'styled-components'
export type { ScrollerProps, Snapshot }

const ScrollerDiv = styled.div`
    margin: 0;
      padding: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      contain: layout;
      will-change: transform;`

export function Scroller<T>(props: ScrollerProps<T>) {
    const container = useRef<HTMLDivElement|null>(null);
    useEffect(() => {
        if (container.current) {
            const ts  = new ScrollerTs(
                container.current,
                props
            )
            return () => ts.close()          
        }
    })
    return (<ScrollerDiv ref={container} />)
}
