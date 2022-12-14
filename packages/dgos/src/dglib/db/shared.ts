
import * as dp from 'idb'
import { Branch, Rpc, Schema, Key, ArraySnapshot, Tx, Lsn, Scan, BranchId, ScanTx } from './data'
import { Interval, IntervalTree } from './interval'
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
// each time we update the database, we need to consider if it changes any of the scans and then send the delta
class Client {
    query = new Map<number, ScanMgr>()
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
class Dbms {
    started = false
    writing = false
    waiting: MessagePort[] = []
    writeQ: Tx[] = []
    log: Tx[] = []
    worker: DbmsWorker[] = []
    //branch = new Map<string, BranchMgr>()
    schema = new Map<string, SchemaMgr>()
    table = new Map<string, Table>()

    predictedLsn = new Map<BranchId, number>
    client = new Map<MessagePort, Client>()

    scanChanged = new Set<ScanMgr>

    scan(id: number, tx: ScanTx, port: MessagePort) {

    }

    // maybe this is a standard query that every client starts with to get a root catalog?
    sendWelcome(p: MessagePort) {
        //p.postMessage({ method: 'welcome', result: this.golden })
    }
    addListener(p: MessagePort) {
        this.client.set(p, new Client())
        if (this.started) {
            this.sendWelcome(p)
        } else {
            this.waiting.push(p)
        }
    }
    removeListener(p: MessagePort) {
        this.client.delete(p)
    }
    async notify(p: MessagePort, method: string, params: any) {

    }

    async getBranchLsn(branch: BranchId) {
        return this.predictedLsn.get(branch) ?? 0
    }



    // each tab only writes one transaction at a time.
    // potentially these are batched, and then we fail at the first failing one.
    async apply(id: number, tx: Tx, p: MessagePort) {
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
                const target = await this.getBranchLsn(branchid)
                if (!target || branchUpdate.lsn != target + 1) {
                    valid = false
                }
            }
            if (!valid) {
                this.notify(p, 'rebase', [])
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

    async updateClient() {
        // update all the tabs.
        for (let [port, cl] of this.client) {

        }
    }

    // servers can update any subset of branches.
    // server transactions update the gold copy, then shared rebases any outdated transactions. finally affected clients are notified.
    async serverSync(tx: Tx[]) {


    }

    db?: dp.IDBPDatabase<any>
    async init() {
        this.started = true
        this.db = await dp.openDB("dg")
        this.waiting.forEach(e => this.sendWelcome(e))
    }
}

let dbms: Dbms
_self.onconnect = function (e) {
    var port = e.ports[0];
    if (!dbms) {
        dbms = new Dbms()
        dbms.init()
    }
    dbms.addListener(port)
    // when we get an update from one tab, we need to trigger a change in all the tabs.
    port.addEventListener('message', function (e) {
        const r = e.data as Rpc
        switch (r.method) {
            case 'scan':
                dbms.scan(r.id, r.params as ScanTx, port)
                break
            case 'tx':
                //[tabs] = ListDelta.apply<Tabx>(tabs, r.params as ListDelta<Tabx>)
                dbms.apply(r.id, r.params as Tx, port)
                break
            case 'close':
                dbms.removeListener(port)
                port.close()
                break
        }

    });
    // dbms.init() will return immediately if database is initialized, otherwise it will wait.

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.

}