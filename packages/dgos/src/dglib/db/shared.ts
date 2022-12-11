import { faker } from '@faker-js/faker'
import { openDB } from 'idb'
import { Tab } from './data'
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
    let r: Tab[] = []
    for (let i = 0; i < 100; i++) {
        r.push({
            level: 0,
            name: faker.internet.domainName(),
            avatar: faker.image.avatar(),
            count: 2,
        })
    }
    return r
}

interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}

const _self: SharedWorkerGlobalScope = self as any;

_self.onconnect = function (e) {
    var port = e.ports[0];

    port.addEventListener('message', function (e) {
        console.log('Worker Received', e.data);
        port.postMessage(exampleList());
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}