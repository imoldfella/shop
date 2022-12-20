
// we need to use one big chunk of memory so that we can use from webassemby
// we split off a chunk for the log

import { FileSystemSyncAccessHandle, getAccess, readJson, useOpfs } from "../../opfs/opfs"
import { Mem } from "../util/mem"
import { RootRecord, Txx } from "./data"
import { LogState } from "./log_writer"

// memory is shared resource, each tab perhaps can ask for some.
const mem = new Mem()


interface StorageState {

}
// take the largest start


async function dataTables(d: FileSystemDirectoryHandle): Promise<FileSystemSyncAccessHandle[]> {
    const r: FileSystemSyncAccessHandle[] = []
    for (let i = 0; i < 64; i++) {
        const f = await d.getFileHandle(`data${i}`)
        r.push(getAccess(f))
    }

    return r
}



interface PageInfo {
    pageLsn: number // newest update to page
    recLsn: number // oldest update to page since last flush
}


interface LogEntry {
    type: Txx
    xid: number
    args: any[]
}

export async function recover(): Promise<[StorageState, LogState]> {
    const fs = await useOpfs()
    const f0: RootRecord = await readJson(fs, 'root0')
    const f1: RootRecord = await readJson(fs, 'root1')
    const active = f0.startCheckpoint < f1.startCheckpoint ? 1 : 0

    //const buffer = mem.allocPages(1024)
    const sst: StorageState = {}
    const lst: LogState = {
        buffer: mem.mem,
        offset: 0,
        length: 0,
        active: 0,
        logPos: 0,
        activeStart: 0
    }

    // read the root; the root is written at checkpoints



    return [sst, lst]
}