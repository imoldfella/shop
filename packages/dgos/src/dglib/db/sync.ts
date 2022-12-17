import { Db, useDb } from "./client";

// this runs as its own shared worker/client so that it can pub/sub normally
// shared worker so that we share one sync for all tabs
interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}

const _self: SharedWorkerGlobalScope = self as any;

// create table 

// we need a worker to query the database, and we need to subscribe to the log.
// since we are a worker, we could do 

// this is enough for all client events,  should we do this? maybe with filtering?
export class LogReader {

}
export class SyncService {
    ws = new Map<string, WebSocket>()
    constructor(public db: Db) {
    }
    async connect(s: string) {
        const ws = new WebSocket(s)
        ws.onclose = () => {

        }
        ws.onmessage = () => {

        }
        ws.onerror = (e) => {
            console.log("sync error ", e)
        }
        ws.onopen = () => {

        }
    }
    async run() {
        // subscribe to the server table. when it changes try to update our websockets accordingly
        this.db.subscribe()
    }
}

export async function createSyncService() {
    const db = new Db({})
    sync = new SyncService(db)
    sync.run()
}

let sync: SyncService
_self.onconnect = function (e) {
    if (!sync) {
        createSyncService()
    } else {
        // dispatch(e.ports[0])
    }
}