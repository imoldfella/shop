
import React, { ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import { Database } from '@datagrove/db'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { negotiateLanguages } from '@fluent/langneg'
import { ReactLocalization } from '@fluent/react'
export * from './combo'

// the database should be in a shared worker? a service worker?
// it can't be in a shared worker on android.
// in any event it needs some in-process handle


// this will read the database from any widget

// this will always be for one worker (main thread) only
let _dgxx = new Database
let _dgdb = React.createContext(_dgxx)
export function useDatabase(): Database {
    return _dgxx
}

export function createDatabase(): Database {
    return _dgxx
}

// A generator function responsible for building the sequence 
// of FluentBundle instances in the order of user's language
// preferences.
// you can call this after user selects as well

export interface ResourceMap {
    [key: string]: FluentResource
}
function useLocalization(rm: ResourceMap, lang?: string[]): (lang: string) => void {
    const l = lang ?? navigator.languages;

    function* generateBundles(userLocales: readonly string[]) {
        // Choose locales that are best for the user.
        const currentLocales = negotiateLanguages(
            userLocales,
            ['en-US', 'es'],
            { defaultLocale: 'en-US' }
        );

        for (const locale of currentLocales) {
            const bundle = new FluentBundle(locale);
            bundle.addResource(rm[locale]);
            yield bundle;
        }
    }

    // The ReactLocalization instance stores and caches the sequence of generated
    // bundles. You can store it in your app's state.
    let l10n = new ReactLocalization(generateBundles(navigator.languages));
    // call this if user wants other than default
    return (lang: string) => {

    }
}
/*
function DatabaseProvider(props: {children?: ReactNode}){
    let db = new Database()
    return (<_dgdb.Provider value={db}>
            {props.children}
            </_dgdb.Provider>)
}
*/

// results can 

// how can we measure?
class IntSet {

}
interface DataView<T> {
    version: number
    count: number
    load: (n: number) => Promise<T>
}
interface ScrolledDataView<T> {
    selection: IntSet
    data: DataView<T>
    anchor: number   // first line of screen
    offset: number
    load: (n: T) => ReactElement
    tombstone: () => ReactElement
}
// would we key
interface ScrollOptions {
    data: QueryResult
}
function xx(x: ReactElement) {
    x.key
}
function Scroller(props: { options: ScrollOptions }) {
    // we need to subscribe to the query result. when it changes we need to adjust accordingly. We can't 
    useEffect(() => {

    }

    )
    const o = props.options.count
    return (<div ></div>)
}

//x = <QueryResult value={ }
class QueryResults {
    scroll: number = 0
}

function ShowResults(props: { results: QueryResults }) {
    // we need to provide a way to update.
    const opt: ScrollOptions = {
        load: function (n: number): React.ReactElement {
            throw new Error('Function not implemented.')
        },
        tombstone: function (): React.ReactElement {
            throw new Error('Function not implemented.')
        }
    }
    // ?
    const [o, setState] = useState(opt)

    // this is awkward to apply a diff to.
    return (
        <Scroller options={opt} scrollMe={setState} />
    )
}