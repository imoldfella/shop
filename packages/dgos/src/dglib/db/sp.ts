
import * as dp from 'idb'
import { Branch, Rpc, Schema, Key, ArraySnapshot, Tx, Lsn, Scan, BranchId, ScanTx, Sandbox } from './data'
import { Interval, IntervalTree } from '../stree/interval'
import { SchemaMgr } from './schema';
import { DbmsWorker } from './worker';

interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}

const _self: SharedWorkerGlobalScope = self as any;

// should we  have tree per table or put table into the
class ScanMgr implements Interval {
    current: any[] = []
    low: Uint32Array;
    high: Uint32Array;
    constructor(public scan: Scan) {
        this.low = scan.low
        this.high = scan.high
    }

}

// we have an interest range lock for each table
class Table {
    root: number = 0
    constructor(
        public schema: Schema
    ) { }

    interval = new IntervalTree

    search(low: Key, high: Key) {
        this.interval.search(low, high)
    }
    addScan(x: Interval) {
        this.interval.insert(x)
    }
    removeScan(x: Interval) {
        this.interval.remove(x)
    }
}
// just allowing global index is not enough; you would need to  index based on the concierge group.
// map a name to group.branch? fairly small integers.
// use two bits bayou style to distinguish predicted and gold

// clients are tabs, but those tabs have clients as well?
// or can the sandbox talk directly to the shared worker? I think the problem there is the context of the sandbox. So the port doesn't really matter for security (all are trusted), but the rpc has to identify the sandbox. also the rpc will 

// each time we update the database, we need to consider if it changes any of the scans and then send the delta
class Client {
    sandbox : Sandbox = {
        identity: {
            secret: new Uint8Array(0)
        }
    }
    constructor(public port: MessagePort){
    }
   
    query = new Map<number, ScanMgr>()

    reply(r: Rpc, result: any) {
        this.port.postMessage({id: r.id, result: result})
    }
}


class Dbms {
    started = false
    writing = false
    waiting: MessagePort[] = []
    writeQ: Tx[] = []
    log: Tx[] = []
    worker: Worker[] = []
    //branch = new Map<string, BranchMgr>()
    schema = new Map<string, SchemaMgr>()
    table = new Map<string, Table>()
    predictedLsn = new Map<BranchId, number>
    client = new Map<MessagePort, Client>()
    scanChanged = new Set<ScanMgr>
    sandbox = new Map<number, Sandbox>()


    async getBranchLsn(branch: BranchId) {
        return this.predictedLsn.get(branch) ?? 0
    }


    async updateClient() {
        // update all the tabs.
        for (let [port, cl] of this.client) {

        }
    }

    // servers can update any subset of branches.
    // server transactions update the gold copy, then shared rebases any outdated transactions. finally affected clients are notified.
    async serverSync(tx: Tx[]) {


    }

    // prepared should use a hash key
    prepared = new Map<string,Proc>()
   
    getWorker() {
        return this.worker[0]
    }


    sendWorker(client: Client, r: Rpc, proc: Proc) {
        // pick a worker at random?
        this.getWorker().postMessage({
            method: r.method,
            params: {
                rpc: r,
                proc: proc,
            }
        })
    }
    prepare(client: Client, r: Rpc){
    }
    exec(client: Client, r: Rpc){
    }
    cancel(client: Client, r: Rpc){
    }


    subscribe(cl: Client, r:Rpc){
    }
    publish(cl: Client, r: Rpc){
        let tx = r.params.tx
        this.writeQ.push(tx)
        if (this.writing) {
            return
        }
        const start = this.log.length
        for (let tx of this.writeQ) {
            // to apply a transaction, each branch must represent a unit increase of predictions.
            // note that if the predictions have been rebased, this will cause transactions to fail and retry.
            // we need to store the log and periodcally write snapshots.
            let valid = true
            for (let [branchid, branchUpdate] of Object.entries(tx)) {
                // if this is a 
               this.getBranchLsn(branchid).then((target)=>{
                if (!target || branchUpdate.lsn != target + 1) {
                    valid = false
                }})
            }

            if (!valid) {
               //this.notify(p, 'rebase', [])
            } else {
                // we need to update the branch lsn here, so that any other transactions in this batch are rejected.

                this.log.push(tx)
            }
        }

        // update our prediction if 
        for (let o of this.log.slice(start)) {
            for (let [branchid, branchUpdate] of Object.entries(tx)) {

            }
        }
    }
    // add a branch to the client. return presumed privileges
    attach(client: Client, r: Rpc) {
         // build a sandbox for an identity and a branch
        r.params.branch
        client.reply(r, {
            writable: true
        })
    }
    detach(client: Client, r: Rpc) {
       
    }
    getClient(port: MessagePort) {
        let r =  this.client.get(port)
        if (!r) {
            r = new Client(port)
            this.client.set(port,r)
        }
        return r
    }
    closeClient(port: MessagePort){
        const client = this.getClient(port)
        // close everything
        this.client.delete(port)
    }

}

export interface Proc {

}

export interface RefreshRequest {

}

let dbms: Dbms
function dispatch(port: MessagePort) {
    // when we get an update from one tab, we need to trigger a change in all the tabs.
    port.start()
    const cl = dbms.getClient(port)
    port.addEventListener('message', function (e) {
        const r = e.data as Rpc

        // we could await here, but that would prevent the client from canceling
        switch (r.method) {
            case 'connect':
                cl.sandbox.identity = r.params
                break
            case 'disconnect':
                dbms.closeClient(port)
                port.close()
                // if this is is the last port we should unload for an attempt at
                // a graceful shutdown.
                break
            case 'attach':
                // get a sandbox id
                dbms.attach(cl, r)
                break
            case 'detach':
                dbms.detach(cl, r)
                break;
            case 'cancel':
                dbms.cancel(cl, r)
                break
            case 'prepare':
                dbms.prepare(cl,r)
                break
            case 'exec':
                dbms.exec(cl,r)
                break
            // publish is a key-value esque writer
            case 'publish':                
                dbms.publish(cl,r)
                break
            // subscribe is a key-value esque reader
            case 'subscribe':
                dbms.subscribe(cl,r)
                break

        }

    });
}

async function createDbms():Promise<Dbms> {
    dbms = new Dbms()
    return dbms
}

_self.onconnect = function (e) {
    if (!dbms) {
      createDbms().then(_=> dispatch(e.ports[0]))
    } else {
      dispatch(e.ports[0])
    }
}