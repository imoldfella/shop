import { Log } from "../client/service"
import { FileSet, LogRecord, Lsn, PageId, StartState, Txn, TxStatus, Txx } from "./data"
import { LogState } from "./log_writer"

export class LogWriter {
    txStatus = new Map<number, TxStatus>()
    dirtyPageTable = new Map<PageId, Lsn>()
    flushedLsn: number
    stop = false

    constructor(public start: StartState) {
        this.flushedLsn = 0
        this.flushLoop()
    }

    get mem() { return this.start.mem }

    beginCheckpoint() {
        const wasActive = [...this.txStatus.keys()]
        this.addRecord(Txx.checkpointBegin)
    }
    completeCheckpoint() {
        // write wasActive in the log record
        this.addRecord(Txx.checkpointEnd)
    }

    addRecord(type: Txx, lr?: Partial<LogRecord>): Lsn {
        //const lsn = nextLsn++

        return 0
    }
    async flushLoop() {
        while (!this.stop) {
            // wait for either a full page or a commit, then write the page
            const maxLsn = 0
            this.addRecord(Txx.txnEnd)
            this.flushedLsn = maxLsn
        }
    }

   
    // we don't begin a checkpoint until we know that we have completed the previous one, so this is a good time to rotate the logs. Our good checkpoint stays in its log, and since that log has a begin and end checkpoint in it, that is enough to recover from so we can trim the unused log and start again. 

    // how do we atomically switch?

    // when you complete the checkpoint, you write the "master" record.
    // this can 

    // before flushing page x, we must have x.pageLsn < flushLsn








}