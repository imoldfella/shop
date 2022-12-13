import { faker } from "@faker-js/faker"
import { Accessor, Context, createContext, createSignal, ParentComponent, Setter, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { ListDelta, Rid, Rpc, Tab, Tabx } from "./data"

class Identity {
    secret = new Uint8Array()
}
export class DgTable<V> {
    keyOf: (v: V) => Uint8Array | undefined = () => undefined

    data = new DgArray()
}



class BranchSnapshot {
    table = new Map<string, TableSnapshot>()
}
// our table has ordinals
class TableSnapshot {

}

// we have a theory that allows transactions across connections, but it has tradoffs.
// branch may be at any historical snapshot, or any historical snapshot + proposed changes.
export class RootBranch {
    // the root branch needs to return the branch tabs.
    tabState = new DgTable()
}


// a Db has one root Dgc, it can find other dgc's from there.
// the root dgc can be found from the identity.
export class DbConfig {

}

// maintains order, but also allows set operations
// I need some way to group a collection. This is a global operation though
class SelectMap {
    getTab: Accessor<Tabx[]>
    setTab: Setter<Tabx[]>
    all = new Map<string, Tabx>()
    // overkill? maybe we should  scan all to get.
    selected = new Set<Tabx>()

    constructor() {
        [this.getTab, this.setTab] = createSignal<Tabx[]>([])
    }
    select(t: Tabx) {
        if (!this.all.get(t.rid)) return

        for (let i of this.selected) {
            i.selected = false
        }
        t.selected = true
        this.selected.clear()
        this.selected.add(t)
    }

    // ctrl-tap on desktop to select multiple tabs
    // on mobile this will be be a long press option
    toggleSelection(t: Tabx) {
        if (!this.all.get(t.rid)) return

        const tab = this.getTab()
        if (this.selected.has(t)) {
            this.selected.delete(t)
            this.setTab(tab)
        } else {
            this.selected.add(t)
            this.setTab(tab)
        }
    }

    applyDelta(delta: ListDelta<Tabx>) {
        // don't use a method here, they don't get passed through ports
        const [newItems, removed] = ListDelta.apply(this.getTab(), delta)
        // if it was removed, then we need to remove it from selected.
        removed.forEach(e => this.selected.delete(e))
        this.setTab(newItems)
    }
    // globally change the tabs; we need to copy the selection from our existing state. Here we match on rid's so that we don't change more than we need to. maybe this should be a delta? delta lists are awkward, but probably more peformant?


}
// can our sandbox safely reach the shared worker? it seems unlikely.

// the list of tabs is shared, but the selection state is local.
// still we need to control the selection state here, because the selected branch may be deleted remotely
export class Db extends SelectMap {
    // we need the selection order + we need to adjust to remote updates
    identity?: Identity
    w: SharedWorker
    // string here is a hexified version of the binary key for the branch.

    constructor(public config: DbConfig) {
        super()
        this.w = new SharedWorker(new URL('./shared', import.meta.url), {
            type: 'module'
        })
        this.w.port.start();
        this.w.port.onmessage = (e) => {

            if (e.data) {
                // if selected[0] is deleted, we need to pick some tab
                const r = e.data as Rpc
                switch (r.method) {
                    case 'tabs':
                        super.applyDelta(r.result as ListDelta<Tabx>)
                        break;
                    default:
                }

            }
        }
        this.w.port.postMessage('Message');
        this.init()
    }

    begin(ts?: number): Tx {
        // create a snapshot from the 
        const sn = new Snapshot()
        return new Tx(this, sn)
    }
    async init() {


    }

    // 
    drop(i: number) {

    }
    newTab() {

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

