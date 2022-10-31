
import React, {ReactNode, useContext } from 'react'
import { Database } from '@datagrove/db'


// the database should be in a shared worker? a service worker?
// it can't be in a shared worker on android.
// in any event it needs some in-process handle


// this will read the database from any widget

// this will always be for one worker (main thread) only
let _dgxx = new Database
let _dgdb =  React.createContext(_dgxx)
export function useDatabase() : Database {
    return _dgxx
}

export function createDatabase() : Database {
    return _dgxx
}
/*
function DatabaseProvider(props: {children?: ReactNode}){
    let db = new Database()
    return (<_dgdb.Provider value={db}>
            {props.children}
            </_dgdb.Provider>)
}
*/