
// prosemirror keeps two copies: predicted and golden; it throws away predicted when new transactions come in.
// transactions are steps that can be rebased. we need to hang on to the transaction until its resolved
// insert doesn't need to changing, delete doesn't need changing. update = delete + f(old, delta)

import { Key } from "../data"
import { SharedWorkerRpc } from "../util/worker_rpc"

// cache/proxy for the database worker
export class Db {
    // w
    constructor() {
        // this.w = new SharedWorkerRpc('../sworker/index.mjs')
        this.init()
    }
    async init() {
        //console.log("init worker")
        //console.log(await this.w.ask('ping'))
    }

    begin(): TxMgr {
        return new TxMgr(this)
    }
}
// update needs to be rebased: delta' = fRebase(old, dGold, delta)
export class TxMgr {
    constructor(public db: Db) { }

    delete(key: Key) {
    }
    insert(key: Key, value: Uint8Array) {

    }
    update(key: Key, value: Uint8Array) {

    }

    async commit(): Promise<boolean> {
        // send to shared
        // if it fails it will be handled when the message comes back, and when we get the new commits
        //this.db.rpc('tx', {})


        // if transaction failed, rebase and try again. we do this on the ui side because a transaction failing
        // may have ui ramifications
        return true
    }
}