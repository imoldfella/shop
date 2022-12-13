import { faker } from '@faker-js/faker'
import * as dp from 'idb'
import { Branch, DeltaLog, ListDelta, Rpc, Schema, ArraySnapshot, Tabx, Tx, Lsn } from './data'

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



// one lsn for the all the branches from client, then substitute with known lsn?
// this seems ok locally but bad remotely.
class Dbms {
    started = false
    waiting: MessagePort[] = []
    golden = new DbSnapshot()
    predicted = new Map<string, BranchSnapshot>()
    log: Tx[] = []
    worker: DbmsWorker[] = []
    branch = new Map<string, BranchMgr>()
    schema = new Map<string, SchemaMgr>()

    get lsn() {
        return this.predicted.lsn + 1
    }

    listener = new Set<MessagePort>()

    sendWelcome(p: MessagePort) {
        p.postMessage({ method: 'welcome', result: this.golden })
    }
    addListener(p: MessagePort) {
        this.listener.add(p)
        if (this.started) {
            this.sendWelcome(p)
        } else {
            this.waiting.push(p)
        }
    }
    removeListener(p: MessagePort) {
        this.listener.delete(p)
    }
    async notify(p: MessagePort, method: string, params: any) {

    }
    async apply(id: number, tx: Tx, p: MessagePort) {
        // to apply a transaction, each branch must represent a unit increase of predictions.
        // note that if the predictions have been rebased, this will cause transactions to fail and retry.
        // we need to store the log and periodcally write snapshots.
        for (let [k, v] of Object.entries(tx)) {
            const target = this.predicted.get(k)
            if (!target || v.lsn != target.lsn + 1) {
                this.notify(p, 'rebase', [])
                return
            }
        }
        this.log.push(tx)

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