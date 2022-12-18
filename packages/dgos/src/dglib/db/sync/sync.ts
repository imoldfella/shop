import { Db, TxMgr, useDb } from "../client"
import { Tx } from "../data"
import { PublishSync } from "./proto"
import { SharedPubSub } from "./pubsub"
import * as dx from './schema'
// probably get a paseto token for each identity to exchange?
// noted earlier that the server could offer some locking for multibranch
// updates. It's not clearly useful though, could be hard for performance.



// read/write various server/branch logs.
// read/write the prediction log
// write the golden log.
export class HostServer {
    lsn = 0
    constructor(public ws: WebSocket){
    }
    // send as heartbeat, server will drop clients that stop heartbeating
    ack() {
        const dv = new DataView(new Uint8Array(8))
        dv.setUint32(0, 0)
        dv.setUint32(0, this.lsn)
        this.ws.send(dv.buffer)
    }
}

// we need an interface to the database, especially to ephemeral/temp tables like 
// create table online(serverurl, online)

// maybe database can implement transaction protocol for immediate 

// upsert online(url, status) values (:url, :status)





export class SyncService {
    ws = new Map<string, HostServer>()
    db = new Db()
    // br = new Map<number, BranchSetHandle>()
    constructor(){

        // get a database connection
        // read the connection information from the database
        // read the user mute settings
        // restore the most recent sync state.
        // subscribe to the log.
        // connect to the server and start processing information

        // send a first online status report to subscribers.
        // no counters are put in status, these are written back to the state database
        // the clients will subscribe that table directly.

        self.setInterval(()=>this.heartbeat(), 1000)
    }

    async connectAll(){
        // subscribe to the database server table, when it changes try to reconnect any servers that are not already connected.

       
    }
    async heartbeat(){
        this.ws.forEach((v)=>{
            v.ack()
        })
    }
    async connectServer(s: string) {
        const ws = new WebSocket(s)
        ws.onopen = () => {
            // update the server status, just write back to the database.
            dx.updateOnline(this.db, {
                url: s,
                status: "y"
            })
        }
        ws.onclose = () => {
            // we want to retry periodically, but we can control that from ui.
            dx.updateOnline(this.db, {
                url: s,
                status: "n"
            })
        }

        ws.onmessage = (m: MessageEvent) => {
            this.syncMessage(ws, JSON.parse(m.data))
        }
        ws.onerror = (e) => {
            console.log("sync error ", e)
        }

    }
    async localLog(d: Uint32Array) {

    }
    /*
    async readLog(b: BranchHandle) {
        // if secret, decrypt with secret key. note that when this key is rotated (user is evicted), we need to provide a new key to each reader. maybe a special grant stream(s)? what about broadcast encryption?
        // confirm that was written by valid writer: signed by author, signed(admin, grant(write,author))
    }
    // heartbeat the server with most recent message that it sent us.
    // if a message was lost, the server will notice.
    */
   
    // convert this directly to a local database commit
    async syncMessage(ws: WebSocket, s: PublishSync) {
        // commit this update to our database, then acknowledge
        // we might want to piggy back this on sends?
        for (let i in s.slot){
            s.slot[i]
            s.length[i]
        }

    }
    async run() {

        // subscribe to the server table. when it changes try to update our websockets accordingly

    }
}

// clients connect to the sync service in order to get server status
// as the server status changes we update the clients. it doesn't take publications.
// this runs as its own shared worker/client so that it can pub/sub normally
// shared worker so that we share one sync for all tabs
interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}
const _self: SharedWorkerGlobalScope = self as any;
let sync = new SyncService()
_self.onconnect = function (e) {  
   sync.connect( e.ports[0],'online')
}
