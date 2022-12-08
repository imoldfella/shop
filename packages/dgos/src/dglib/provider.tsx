import { createSignal, createContext, useContext, ParentComponent, Setter, Accessor, Suspense, lazy, createResource, Context } from "solid-js";

// the db context will always be global, is this just unnecessary abstraction to try and find it on the stack?
// I guess the global context is the dbms, where this context is a specific database and login.
// evreything in a site must come from the database, dglib, and the plugins. we should be able to build plugins with either datagrove or github experiences.

// do we need a shared worker and a service worker? a service worker has a better defined lifetime.
// chrome android doesn't support shared worker.


class DbSharedWorker {

    async serve(method: string, id: number, params: any): Promise<any> {
        switch (method) {
            case 'init':
                this.reply<DbcState>(id, {
                    identity: {
                        username: 'imoldfella',
                        privateKey: new Uint8Array()
                    }
                })
                break;
        }
    }
    reply<T>(id: number, params: T) {
        this.promise.get(id)![0](params)
        this.promise.delete(id)
    }

    promise = new Map<number, [any, any]>
    next = 1
    async rpc(method: string, params: any): Promise<any> {
        const id = this.next++
        let pr = new Promise((resolve, reject) => {
            this.promise.set(id, [resolve, reject])
            this.serve(method, id, params)
        })
    }
    async initialState(): Promise<DbcState> {
        return this.rpc('init', {})
    }
}

interface Identity {
    username: string
    privateKey: Uint8Array
}
interface DbcState {
    identity?: Identity
}

class ServiceWorker {


}

// store? context? both?
export class Dbc {
    identity: Identity = {
        username: '',
        privateKey: new Uint8Array(0)
    }
    partition = new Map<string, Partition>()
    sw = new DbSharedWorker()

    constructor(public d: DbcConfig) {
    }
    async init() {
        this.identity = await this.sw.rpc('init', {})
    }
}
export class Partition {
    branch = 0
    app = ""
    appversion = 0

}

export class DataView {

}
export class Tx {
}
export interface DbcConfig {

}
export class Snapshot {
}

// committer is a little different than a signal
type Committer<T, Tx> = [Accessor<T>, (t: Tx) => void]

let dbcContext: Context<Dbc>


export function commit(db: Dbc, tx: Tx): Dbc {
    return db
}

export async function openDatabase(props?: { config?: DbcConfig }) {
    const dbc = new Dbc(props?.config ?? {})
    await dbc.init()
    return dbc
}

export const DbcProvider: ParentComponent<{ db: Dbc }> = (props) => {
    //   const [db, setDb] = createSignal()
    // here we are providing a snapshot and a transaction getter.
    // why not just a transaction getter, which needs a snapshot anyway? 
    //const [userId, setUserId] = createSignal()
    //   const [dbc] = createResource<string, any>({}, ()=> {return {} } )

    // const dbs: Committer<Dbc, Tx> = [
    //     db,
    //     (tx: Tx) => setDb(commit(db(), tx))
    // ];
    const DbcContext = createContext(props.db)
    dbcContext = DbcContext
    return (
        <DbcContext.Provider value={props.db} >
            {props.children}
        </DbcContext.Provider>)
}

export function useDbc() { return useContext(dbcContext); }

