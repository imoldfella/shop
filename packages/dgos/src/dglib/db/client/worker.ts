import { useLogWriter } from "../log";
import { Rpc } from "../util/worker_rpc";
import { Client } from './dbw'
import { useLogReader } from "../log";
import { Mem } from "../util/mem";
//import { useFs } from "../../opfs";
import { LogState } from "../log/log_writer";
import { FileSystemSyncAccessHandle, getAccess, readJson, useOpfs } from "../../opfs/opfs";
import { Tx } from "../data";

// simple single client 
const client = new Client((r: Rpc) => { postMessage(r) })
// for debug use worker all in one. compose dispatch?
// we need each module to act like the other modules are workers


onmessage = (e: MessageEvent) => {
    const r = e.data as Rpc
    switch (r.method) {
        case "logw":
            //log.write(r.data)
            return {}
        case "logr":
            // return
            return {}
    }
    client.dispatch(e.data).then(e => postMessage({
        id: r.id,
        result: e
    })).catch((e) => postMessage({
        id: r.id,
        error: e
    }))
}


