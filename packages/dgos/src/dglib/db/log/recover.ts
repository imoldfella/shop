
// we need to use one big chunk of memory so that we can use from webassemby
// we split off a chunk for the log

import { FileSystemSyncAccessHandle, getAccess, readJson, useOpfs } from "../../opfs/opfs"

import { Checkpoint, fileSet, FileSet, LogRecord, Lsn, MemDb, RootRecord, StartState, Txx } from "./data"
import { LogState } from "./log_writer"

export class LogReader {
    constructor(public fh: FileSet) {

    }
    forEach(fn: (x: LogRecord) => boolean) {

    }
}

// fix the data files using the log, trim the log and return clean starting point
// if no files exist, then return an empty database.


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
            case Txx.update:
                // update active pages.
        }
        return true
    })

    // redo
    lr.forEach((r) => {
        switch (r.type) {
            case Txx.checkpointEnd:
                r.value as Checkpoint
            case Txx.update:
                // update active pages.
        }
        return true
    })

    // undo
    lr.forEach((r) => {
        switch (r.type) {
            case Txx.checkpointEnd:
                r.value as Checkpoint
            case Txx.update:
                // update active pages.
        }
        return true
    })

    
    return {
        mem,
        df,
        lf,
        active: 0
    }
}