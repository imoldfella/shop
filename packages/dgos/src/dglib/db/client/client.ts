
// prosemirror keeps two copies: predicted and golden; it throws away predicted when new transactions come in.
// transactions are steps that can be rebased. we need to hang on to the transaction until its resolved
// insert doesn't need to changing, delete doesn't need changing. update = delete + f(old, delta)

import { Key } from "../data"
import { sharedWorker } from "../util/worker_rpc"
import { Client } from "./dbw"

// since shared is just to support multiple tabs, maybe we can launch directly to make it easier to debug?

//const worker = sharedWorker(new URL('./shared', import.meta.url))
// await worker.ask('ping').then(e => {
//     console.log("adferw", e)
// })



// cache/proxy for the database worker
export class Db {

    // with one tab, there is just this one client
    cl = new Client(()=>{ }) 
    async ask(method: string , params?: any) : Promise<any>{
        const o =  await this.cl.dispatch( {
            method,
            id: 42,
            params
        })
        return {
            id: 42,
            result: o
        }
    }

    constructor() {
        this.init()
    }
    async init() {

       await this.ask('start')
       console.log("init", await this.ask('ping'))
    }
    async stop() {
        //await worker.ask('stop')
    }
    begin(): TxMgr {
        return new TxMgr(this)
    }
}
export async function createDb() {
    const r = new Db()
    await r.init()
    return r
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