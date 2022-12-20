import { faker } from "@faker-js/faker"
import { Accessor, Context, createContext, createSignal, ParentComponent, Setter, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { Db, TxMgr } from "../db/client/client"
import { ListDelta, listDeltaApply, Rid, Tab, Tabx, Tx, Identity, DbConfig, BranchId, Key } from "../db/data"


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

export class SolidDb {
    constructor(public db: Db){}
    tabs = new SelectMap()
}

export async function openDb(props: {
    secret: string
}): Promise<SolidDb | undefined> {
    return undefined
}

let dbContext: Context<SolidDb>
export const DbProvider: ParentComponent<{value: Db}> = (props) => {
    const db = new SolidDb(props.value)
    const DbContext = createContext(db)
    dbContext = DbContext
    return (
        <DbContext.Provider value={db} >
            {props.children}
        </DbContext.Provider>)
}
export function useDb() { return useContext(dbContext); }



