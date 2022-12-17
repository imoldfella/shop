import { faker } from "@faker-js/faker"
import { Accessor, Context, createContext, createSignal, ParentComponent, Setter, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { ListDelta, listDeltaApply, Rid, Rpc, Tab, Tabx, Tx, Identity, DbConfig, BranchId, Key } from "./data"



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
        const [newItems, removed] = listDeltaApply(this.getTab(), delta)
        // if it was removed, then we need to remove it from selected.
        removed.forEach(e => this.selected.delete(e))
        //this.setTab(newItems)
    }
    // globally change the tabs; we need to copy the selection from our existing state. Here we match on rid's so that we don't change more than we need to. maybe this should be a delta? delta lists are awkward, but probably more peformant?


}
// can our sandbox safely reach the shared worker? it seems unlikely.

// the list of tabs is shared, but the selection state is local.
// still we need to control the selection state here, because the selected branch may be deleted remotely
export class Db extends SelectMap {
    // we need the selection order + we need to adjust to remote updates
    profile: BranchId = "" // anonymous
    w: SharedWorker
    // string here is a hexified version of the binary key for the branch.

    update() {
        //super.applyDelta(r.result as ListDelta<Tabx>)
    }

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
                    case 'update':
                        // some scans have changed. 
                        break
                    default:
                        // this should be a reply to a transaction
                        r.id
                }
            }
        }

        (async () => {

        })()
    }

    begin(): TxMgr {
        // create a snapshot from the 
        return new TxMgr(this)
    }
    next = 1
    async rpc(method: string, params: any) {
        const id = this.next++
        this.w.port.postMessage({
            method: method,
            id: id,
            params: params
        })
    }
    // 

}
// each table has functions to delete, insert, update

export function deleteTabTx(tx: TxMgr, i: number) {
    // tx.branch(tx.db.profile)
    // tx.drop(i)
}
export function deleteTab(db: Db, i: number) {
    const tx = db.begin()
    deleteTabTx(tx,i)
    tx.commit()
}
// return a function that can take either tx or db
export function insertTabTx(tx: TxMgr) {

}
export function insertTab(db: Db) {
    const tx = db.begin()
    insertTabTx(tx)
    tx.commit()
}
class Updater {
    // assume that 
    forward = (a: Uint8Array) => a
    back = () => { }
}
// prosemirror keeps two copies: predicted and golden; it throws away predicted when new transactions come in.
// transactions are steps that can be rebased. we need to hang on to the transaction until its resolved
// insert doesn't need to changing, delete doesn't need changing. update = delete + f(old, delta)
// update needs to be rebased: delta' = fRebase(old, dGold, delta)
export class TxMgr {
    constructor(public db: Db) { }

    updater: Updater[] = []

    delete(key: Key) {
    }
    insert(key: Key, value: Uint8Array) {

    }
    update(key: Key, value: Uint8Array) {

    }

    async commit(): Promise<boolean> {
        // send to shared
        // if it fails it will be handled when the message comes back, and when we get the new commits
        this.db.rpc('tx',{ })


        // if transaction failed, rebase and try again. we do this on the ui side because a transaction failing
        // may have ui ramifications
        return true
    }
}

export async function openDb(props: {
    secret: string
}): Promise<Db | undefined> {
    return undefined
}

let dbContext: Context<Db>
export const DbProvider: ParentComponent<{}> = (props) => {
    const db = new Db({})
    const DbContext = createContext(db)
    dbContext = DbContext
    return (
        <DbContext.Provider value={db} >
            {props.children}
        </DbContext.Provider>)
}

export function useDb() { return useContext(dbContext); }

