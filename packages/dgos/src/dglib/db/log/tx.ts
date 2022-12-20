import { Mem } from "../util/mem"
import { addRecord, nextTxn } from "./commit"


// TxMgr needs to take a mem and use protocols to write log records into buffers coordinating with other thread.

// a tab can die at any time, leaving unfinished transactions
// what will these do? can we roll them back at the next checkpoint? two checkpoints?

import { LogRecord, Txn, Txx, TxStatus } from "./data"

// CLR = compensation log record.
export class TxMgr {
    // status: TxStatus = TxStatusType.run
    prevLsn = 0
    constructor(public mem: Mem) {
        
    }


    addRecord(type: Txx, lr: Partial<LogRecord>) {
        lr.prevLsn = this.prevLsn
        this.prevLsn = addRecord(type, lr)
    }
    insert() {
        this.addRecord(Txx.insert, {})
    }
    // maybe not async? spin lock perhaps?
    async commit() {
        this.addRecord(Txx.commit, {})
    }
    async rollback() {
        // for each record we have written, write a CLR.
        // start from prevLsn and read backward until we get to begin.
        while (true) {

        }
    }
}
