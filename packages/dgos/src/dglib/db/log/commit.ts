import { Log } from "../client/service"
import { LogRecord, Lsn, PageId, Txn, Txx } from "./data"
import { LogState } from "./log_writer"

// status needs to be in shared ram?
enum TxStatusType {
    undo = 0,
    run = 1,
    commit = 2,
}
export interface TxStatus {
    //xid: number
    status: TxStatusType
    // if commit, must redo. if run, must undo
    lastLsn: number
}

// att and dtt are included in checkpoint end
export const txStatus = new Map<number, TxStatus>()

// Lsn is "recLsn"; first lsn to make the page dirty
export const dirtyPageTable = new Map<PageId, Lsn>()


let wasActive: Txn[] = []
export function beginCheckpoint() {
    wasActive = [...txStatus.keys()]
    addRecord(Txx.checkpointBegin)
}
export function completeCheckpoint() {
    // write wasActive in the log record
    addRecord(Txx.checkpointEnd)
}
// before flushing page x, we must have x.pageLsn < flushLsn
export let flushedLsn = 0 // newst lsn on disk
export let nextLsn = 0
export let nextTxn_ = 0
export function nextTxn() {
    return nextTxn_++
}

export function addRecord(type: Txx, lr?: Partial<LogRecord>): Lsn {
    const lsn = nextLsn++


    return lsn
}

export function flushSome(log: LogState) {
    while (true) {
        // wait for either a full page or a commit, then write the page
        const maxLsn = 0
        addRecord(Txx.txnEnd)
        flushedLsn = maxLsn
    }
}

export function abort(x: Txn) {

}