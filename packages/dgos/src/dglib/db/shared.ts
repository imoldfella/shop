import { faker } from '@faker-js/faker'
import { openDB } from 'idb'
import { DeltaLog, ListDelta,  Rpc,  Tabx } from './data'
export async function doDatabaseStuff() {
    const db = await openDB('dg');
}

// the db context will always be global, is this just unnecessary abstraction to try and find it on the stack?
// I guess the global context is the dbms, where this context is a specific database and login.
// evreything in a site must come from the database, dglib, and the plugins. we should be able to build plugins with either datagrove or github experiences.

// do we need a shared worker and a service worker? a service worker has a better defined lifetime.
// chrome android doesn't support shared worker.


// self.addEventListener('message', function (e) {
//     self.postMessage(e.data);
// }, false);

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

_self.onconnect = function (e) {
    var port = e.ports[0];
    let tabs = exampleList()
    let log = new DeltaLog<Tabx>(0,tabs)

    port.addEventListener('message', function (e) {
        const r = e.data as Rpc
        switch(r.method){
            case 'tab':
                [tabs] = ListDelta.apply<Tabx>(tabs, r.params as ListDelta<Tabx>)
                break
            default:
            case 'init':
            
        }
        
    });
    port.postMessage({method: 'tabs', result: log.golden});
    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}