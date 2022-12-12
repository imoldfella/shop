import { faker } from "@faker-js/faker"
import { Accessor, Context, createContext, createSignal, ParentComponent, Setter, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { Tab } from "./data"

class Identity {
    secret = new Uint8Array()
}
export class DgTable<V> {
    keyOf: (v: V) => Uint8Array | undefined = () => undefined

    data = new DgArray()
}

// animation-play-state: running | paused
export class Snapshot {
    // a table of tables. table, key/ordinal
    // layered 
    branch = new Map<number, BranchSnapshot>()

}
class BranchSnapshot {
    table = new Map<string, TableSnapshot>()
}
// our table has ordinals
class TableSnapshot {

}

// we have a theory that allows transactions across connections, but it has tradoffs.
// branch may be at any historical snapshot, or any historical snapshot + proposed changes.
export class Branch {

}
export class RootBranch extends Branch {
    // the root branch needs to return the branch tabs.
    tabState = new DgTable()
}


// a Db has one root Dgc, it can find other dgc's from there.
// the root dgc can be found from the identity.
export class DbConfig {

}

export interface TabState {
    selected: boolean
}

type Tabx = Tab & TabState

type Rid = string

// the list of tabs is shared, but the selection state is local.
// still we need to control the selection state here, because the selected branch may be deleted remotely
export class Db {
    selected: Rid[] = []
    item: Tabx[] = []

    identity?: Identity
    root: Branch = new RootBranch()
    w: SharedWorker
    getTab: Accessor<Tabx[]>
    setTab: Setter<Tabx[]>
    constructor(public config: DbConfig) {
        [this.getTab, this.setTab] = createSignal<Tabx[]>([])
        this.w = new SharedWorker(new URL('./shared', import.meta.url), {
            type: 'module'
        })
        this.w.port.start();
        this.w.port.onmessage = (e) => {
            if (e.data) {
                // if selected[0] is deleted, we need to pick some tab
                const item = e.data as Tabx[]
                for (let o in item) {
                    item[o].selected = this.selected.indexOf[o.rid)!= -1

                }
                this.setTab(item);
            }
        }
        this.w.port.postMessage('Message');
        this.init()
    }
    // string here is a hexified version of the binary key for the branch.
    branch = new Map<string, Branch>()

    begin(ts?: number): Tx {
        // create a snapshot from the 
        const sn = new Snapshot()
        return new Tx(this, sn)
    }
    async init() {


    }
    // select doesn't need to go 
    select(i: number) {
        const { active, selected, item } = this.getTab()
        this.setTab({
            active: i,
            selected: [],
            item
        })
    }
    toggleSelection(i: number) {
        const { active, selected, item } = this.getTab()
        let idx = selected.indexOf(i)
        if (idx == -1) {
            this.setTab({ item, active, selected: [i, ...selected] })
        } else {
            selected.splice(idx, 1)
            this.setTab({ item, active, selected: selected })
        }
    }
    drop(i: number) {

    }
    newTab() {

    }
}


// transactions need to be rebaseable
export class Tx {
    constructor(public db: Db, snapshot: Snapshot) {

    }
    async commit() {
    }
}

export class DgArray<Value>  {
    insert(index: number, value: Value): DgArray<Value> {
        return this
    }
    remove(index: number, end: number): DgArray<Value> {
        return this
    }
}


export async function tryLoad(props: {
    secret: string
}): Promise<Db | undefined> {
    return undefined
}


let dbContext: Context<Db>
export const DbProvider: ParentComponent<{}> = (props) => {
    //   const [db, setDb] = createSignal()
    // here we are providing a snapshot and a transaction getter.
    // why not just a transaction getter, which needs a snapshot anyway? 
    //const [userId, setUserId] = createSignal()
    //   const [dbc] = createResource<string, any>({}, ()=> {return {} } )

    // const dbs: Committer<Dbc, Tx> = [
    //     db,
    //     (tx: Tx) => setDb(commit(db(), tx))
    // ];

    const db = new Db({})
    const DbContext = createContext(db)
    dbContext = DbContext
    return (
        <DbContext.Provider value={db} >
            {props.children}
        </DbContext.Provider>)
}

export function useDb() { return useContext(dbContext); }

