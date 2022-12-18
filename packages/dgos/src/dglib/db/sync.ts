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

// reads the log, resolves the sandbox. sandbox is not just branch, because concierge sites have n sites
// can't be just server, no trust. sandboxes need id's (root branch) that are

// can you fork a branchset? tag it? name it? grant/revoke it?
// You could have open multiple branchsets, but you still only write to a single branch?
export class BranchSetHandle {
    url = ""

}
export class Host {

}
class Identity {

}
export class BranchHandle {
    server?= new Host()
    identity?= new Identity // used to sign. 
    publicHmacKey = new Uint8Array(0) // secret shared with server
    writerPublic?: Uint8Array//    readers have this to confirm it was 
    readerSecret = new Uint8Array(0)  // used for encryption at rest. 
    branch = ""
    serverHandle = 0
}
export interface SyncMessage {
    lsn: number    // use to ack
    serverHandle: number[]
    length: number[]
}
export class SyncService {
    ws = new Map<string, WebSocket>()
    br = new Map<number, BranchSetHandle>()
    constructor(public db: Db) {
    }
    async connect(s: string) {
        const ws = new WebSocket(s)
        ws.onclose = () => {

        }

        ws.onmessage = (m: MessageEvent) => {

            this.syncMessage(ws, JSON.parse(m.data))

        }
        ws.onerror = (e) => {
            console.log("sync error ", e)
        }
        ws.onopen = () => {

        }
    }
    async localLog(d: Uint32Array) {

    }
    async readLog(b: BranchHandle) {
        // if secret, decrypt with secret key. note that when this key is rotated (user is evicted), we need to provide a new key to each reader. maybe a special grant stream(s)? what about broadcast encryption?
        // confirm that was written by valid writer: signed by author, signed(admin, grant(write,author))
    }
    async syncMessage(ws: WebSocket, s: SyncMessage) {
        // commit this update to our database, then acknowledge
        // we might want to piggy back this on sends?

        const dv = new DataView(new Uint8Array(8))
        dv.setUint32(0, 0)
        dv.setUint32(0, s.lsn)
        ws.send(dv.buffer)
    }
    async run() {

        // subscribe to the server table. when it changes try to update our websockets accordingly

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