export enum Txx {
    begin = 0,
    commit = 1,
    insert = 2,

    txnEnd = 4, // write after all records flushed, not flushed
    abort = 5,
    clr = 6,
    checkpointBegin = 7,
    checkpointEnd = 8
}

export type LogRecord = {
    type: Txx,
    lsn: Lsn,
    txn: Txn
    prevLsn: number // backward link 
    undoNext: number // for clr, next to undo
    key: string
    value: any
    before: any
}
export interface RootRecord {
    startCheckpoint: number
    //endCheckpoint: number  // aka Master record
}

export class LogPage {


}

// writers will create log pages and
export type Lsn = number // maybe lsn should be offset in log?
export type Txn = number
export type PageId = number
