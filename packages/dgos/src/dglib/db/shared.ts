import { faker } from '@faker-js/faker'
import * as dp from 'idb'
import { Branch, DeltaLog, ListDelta, Rpc, Schema, ArraySnapshot, Tabx, Tx, Lsn, Scan, bstr } from './data'
import { Interval, IntervalTree } from './interval'

// tabs share a common database engine, they also see each tab's updates. this could probably be optimized.

// the db context will always be global, is this just unnecessary abstraction to try and find it on the stack?
// I guess the global context is the dbms, where this context is a specific database and login.
// evreything in a site must come from the database, dglib, and the plugins. we should be able to build plugins with either datagrove or github experiences.

// do we need a shared worker and a service worker? a service worker has a better defined lifetime.
// chrome android doesn't support shared worker.


// self.addEventListener('message', function (e) {
//     self.postMessage(e.data);
// }, false);

// we should start with just datagrove, and then when that starts allow it to seach for sites to add.
function exampleList() {
    let r: Tabx[] = []
    for (let i = 0; i < 100; i++) {
        r.push({
            rid: `${i}`,
            level: 0,
            name: faker.internet.domainName(),
            avatar: faker.image.avatar(),
            count: 2,
            selected: false
        })
    }
    return r
}

interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}

const _self: SharedWorkerGlobalScope = self as any;


// the user interface can rearrange the tabs, so it should ship a delta back to the database? how can we make this robust with races? where do we rebase?
// note that this will eventually have multiple clients, do we want to track them all separately?
export class DbmsWorker {

}
export interface BranchSnapshot {
    lsn: Lsn
    table: {
        [table: string]: ArraySnapshot<any>
    }
}

// prosemirror is going to create a step and just toss it to the dbms blindly?
// prosemirror wants to be able to see a failure, we need to let it.
// these may be a special transaction. are other updates ok to push blindly, let shared worker transform them?

// one lsn for the all the branches from client, then substitute with known lsn?
// this seems ok locally but bad remotely.

export type BranchId = string

// here we need to keep track of the client's requested scans and update them whenever they change.

// ScanMgr's can be shared, as in the case of the tab query
// these can be shared 
class ScanMgr {
    current: any[] = []
    constructor(public scan: Scan){}
}
// each time we update the database, we need to consider if it changes any of the scans and then send the delta
class Client {
    query = new Map<number, ScanMgr>()
}

class Page {

}
// we have an interest range lock for each table
class Table {
    root: number = 0
    constructor(
        public schema: Schema
    ){}
}

// these should be in a segment/interval tree.
// 
class InterestLock {
    constructor( ){}
}

interface BstrInterval extends Interval {
    scan: ScanMgr
}

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

    predictedLsn = new Map<BranchId,number>
    client = new Map<MessagePort, Client>()
    // set is not right here, it should be a segment/interval tree.
    // then we could cheaply determine whether we need to insert into scanChanged
    // we might need a wtree here? we need to stab for each record?
    scan = new Set<ScanMgr>
    scanChanged = new Set<ScanMgr>

    interval = new IntervalTree<BstrInterval>

    search(low: bstr, high: bstr) {
        return this.interval.search(low,high)
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

    async getBranchLsn(branch: BranchId){
        return this.predictedLsn.get(branch)??0
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
                        valid=false
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
        for (let o of this.log.slice(start)){
            for (let [branchid, branchUpdate] of Object.entries(tx)) {

            }
        }
    }

    async updateClient( ){
        // update all the tabs.
        for (let [port,cl] of this.client){

        }
    }

    // servers can update any subset of branches.
    // server transactions update the gold copy, then shared rebases any outdated transactions. finally affected clients are notified.
    async serverSync(tx: Tx[]){


    }

    db?: dp.IDBPDatabase<any>
    async init() {
        this.started = true
        this.db = await dp.openDB("dg")
        this.waiting.forEach(e => this.sendWelcome(e))
    }
}
export class SchemaMgr {
    constructor(public schema: Schema) {
    }
}

// although each branch has their own log, updates are serialized into a single log.
export class BranchMgr {
    constructor(
        public db: Dbms,
        public branch: Branch,
        public schema: SchemaMgr
    ) { }
}
let dbms: Dbms
_self.onconnect = function (e) {
    var port = e.ports[0];
    let tabs = exampleList()
    //let log = new DeltaLog<Tabx>(0,tabs)
    if (!dbms) {
        dbms = new Dbms()
        dbms.init()
    }
    dbms.addListener(port)
    // when we get an update from one tab, we need to trigger a change in all the tabs.
    port.addEventListener('message', function (e) {
        const r = e.data as Rpc
        switch (r.method) {
            case 'tx':
                //[tabs] = ListDelta.apply<Tabx>(tabs, r.params as ListDelta<Tabx>)
                dbms.apply(r.params as Tx)
                break
            case 'close':
                dbms.removeListener(port)
                port.close()
                break;
        }

    });
    // dbms.init() will return immediately if database is initialized, otherwise it will wait.

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.

}