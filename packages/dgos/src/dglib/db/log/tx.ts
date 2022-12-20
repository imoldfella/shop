import { addRecord, nextTxn, TxStatus } from "./commit"
import { LogRecord, Txn, Txx } from "./data"

// CLR = compensation log record.
export class TxMgr {
    // status: TxStatus = TxStatusType.run
    prevLsn = 0
    constructor(public txn: Txn) {

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
export function beginTxn(): TxMgr {
    const r = new TxMgr(nextTxn())
    addRecord(Txx.begin, {
        txn: r.txn
    })
    return r
}