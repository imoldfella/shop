// when log watchers watch, they must be copy out the data, and then check that it wasn't overwritten. If it was they can read from the log.
//https://github.com/mozilla-spidermonkey/js-lock-and-condition/search?q=notifyOne

export class LogHeader {
    static quit = 0
    static condvar = 1
    static tail = 1
    static avail = 2
    sm64: BigUint64Array
    constructor(public sm: Int32Array) {
        this.sm64 = new BigUint64Array(sm)
    }

    quit() {
        this.sm[0] = 1
    }
    notify() {
        Atomics.notify(this.sm, LogHeader.condvar);
    }
    wait() {

    }
    addTail(n: bigint) {
        return Atomics.add(this.sm64, 1, n)
    }
    // return true if acceptable to write up to log position n


}

// a conditional variable needs to 