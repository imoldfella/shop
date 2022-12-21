
import * as dp from 'idb'
import { Branch, Schema, Key, ArraySnapshot, Tx, Lsn, Scan, BranchId, ScanTx, Sandbox } from '../data'
import { Interval, IntervalTree } from '../util/interval'
import { Rpc, worker } from '../util/worker_rpc';

// should  be shared workers so that the clients can access directly
// const log = worker(new URL('./log', import.meta.url))
// const store = worker(new URL('./store', import.meta.url))

// worker per client? makes it easy terminate, sandbox
export class Client {
    sandbox: Sandbox = {
        identity: {
            secret: new Uint8Array(0)
        }
    }
    query = new Map<number, ScanMgr>()

    constructor(public sender: (r: Rpc) => void) {
    }

    reply(r: Rpc, result: any) {
        this.sender({ id: r.id, result: result })
    }

    async dispatch(r: Rpc): Promise<any> {
        switch (r.method) {
            case 'ping':
                return 'pong'
            case 'add':
                const o = r.params as Int32Array
                console.log("w", o)
                Atomics.store(o, 0, 43)
                return 44
            case 'connect':
                this.sandbox.identity = r.params
                break
            case 'attach':
                // get a sandbox id
                r.params.branch
                this.reply(r, {
                    writable: true
                })
                break
            case 'detach':
                //detach(cl, r)
                break;
            case 'cancel':
                //cancel(cl, r)
                break
            case 'prepare':
                //prepare(cl, r)
                break
            case 'exec':
                //exec(cl, r)
                break
            // publish is a key-value esque writer
            case 'publish':
                //publish(cl, r)
                break
            // subscribe is a key-value esque reader
            case 'subscribe':
                //subscribe(cl, r)
                break
            default:
                return r.method
        }
    }

}

class ScanMgr implements Interval {
    current: any[] = []
    low: Uint32Array;
    high: Uint32Array;
    constructor(public scan: Scan) {
        this.low = scan.low
        this.high = scan.high
    }
}



// we might want this in a class so we can use it in different contexts?
// but we need workers no matter what, so not sure.

// logworker needs its own thread so that it can block inside opfs, shared to allow each client access



/*
// should we  have tree per table or put table into the


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

// don't terminate workers, it will leave latches in bad state.
function onerror(a: any) {
    console.log("worker error", a)
}




// each time we update the database, we need to consider if it changes any of the scans and then send the delta





    // servers can update any subset of branches.
    // server transactions update the gold copy, then shared rebases any outdated transactions. finally affected clients are notified.


    // prepared should use a hash key
    prepared = new Map<string, Proc>()




    prepare(client: Client, r: Rpc) {
    }
    exec(client: Client, r: Rpc) {
    }
    cancel(client: Client, r: Rpc) {
        client.worker.terminate()
        client.worker = new Worker('clientworker')
    }


    subscribe(cl: Client, r: Rpc) {
    }
    publish(cl: Client, r: Rpc) {
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
                this.getBranchLsn(branchid).then((target) => {
                    if (!target || branchUpdate.lsn != target + 1) {
                        valid = false
                    }
                })
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
        let r = this.client.get(port)
        if (!r) {
            r = new Client(port)
            this.client.set(port, r)
        }
        return r
    }
    closeClient(port: MessagePort) {

    }

}

export interface Proc {

}

export interface RefreshRequest {

}

let dbms: Dbms



*/