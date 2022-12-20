
// we need to use one big chunk of memory so that we can use from webassemby
// we split off a chunk for the log

import { FileSystemSyncAccessHandle, getAccess, readJson, useOpfs } from "../../opfs/opfs"

import { fileSet, FileSet, LogRecord, Lsn, MemDb, RootRecord, StartState, Txx } from "./data"
import { LogState } from "./log_writer"

// memory is shared resource, each tab perhaps can ask for some.




// when we end there will be pages in the buffer pool, these are seen only in the raw bytes though, we don't make a typescript friend one because bytes are easier to share.


// a little bit of performance leak? we don't need the wrapper could use global functions instead, but are javascript functions ever global?

// with variable page sizes, we might need the headers to be in a consistent spot?
// 



// when a checkpoint begins, we will trim the older file (opfs delete?) 
// when the checkpoint ends,  we will write a master record indicating it ended correctly.

// If there is a crash 


export class LogReader {
    constructor(public fh: FileSet) {

    }
    forEach(fn: (x: LogRecord) => boolean) {

    }
}

// fix the data files using the log, trim the log and return clean starting point
// if no files exist, then return an empty database.

type Checkpoint = {
    activeTx: number[]
    dirty: number[]
}

// when we are done there will be no active transactions and no dirty pages.
export async function open(): Promise<StartState> {
    const mem = new MemDb()
    const fs = await useOpfs()
    const df = await fileSet(fs, 'data', 64)
    const lf = await fileSet(fs, 'log', 2)

    if (await lf[0].getSize() == 0 && await lf[1].getSize() == 0) {
        return {
            mem,
            df,
            lf,
            active: 0
        }
    }

    // read these from the checkpoint end when we find it.
    // if we don't find it, then it was empty
    const activeTx: {
        [key: number]: {}
    } = {}
    const dirtyPage = new Map<number, number>()

    const root: (Lsn)[] = [
        await readJson<number>(fs, 'root0') ?? 0,
        await readJson<number>(fs, 'root1') ?? 0]

    // start at the beginning of 
    const newestCheckpoint = root[0] > root[1] ? 0 : 1

    // run recovery. we might have to read both logs
    // start with newest checkpoint, then read to the end of the log
    const notNewest = (newestCheckpoint + 1) & 1
    const lr = new LogReader([lf[newestCheckpoint], lf[notNewest]])
    // analyze
    lr.forEach((r) => {
        switch (r.type) {
            case Txx.checkpointEnd:
                r.value as Checkpoint
            case Txx.insert:
                
        }
        return true
    })

    // redo


    // undo

    return {
        mem,
        df,
        lf,
        active: 0
    }
}