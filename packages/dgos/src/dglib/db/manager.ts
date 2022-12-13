import { DeltaLog, ListDelta, Lsn, ArraySnapshot } from "./data"

const keep = 0
const insert = 1
const skip = 2

export function getRandom(): number {
    const r = new BigUint64Array(1)
    window.crypto.getRandomValues(r)
    return Number(r[0])
}
export class DeltaMgr<T> {
    listener = new Set<() => void>
    addListener(fn: () => void) { }
    removeListener(fn: () => void) {
        this.listener.delete(fn)
    }
    notifyListeners() {
        this.listener.forEach(e => e())
    }
    session: number
    constructor(public log: DeltaLog<T>) {
        this.session = getRandom()
    }
    // we can only apply a change to the log if its the most recent we have seen. If we accept a change we are responsible for transforming it to the next level.
    // there is a hybrid approach where we can apply commutive steps, but these are limited because any delete is generally not commutative.
    tryApply(delta: ListDelta<T>[]): boolean {
        return true
    }

    static fromSnapshot<T>(sn: ArraySnapshot<T>) {
        return new DeltaMgr<T>({
            golden: sn,
            pending: [],
            predicted: sn
        })
    }

    push(x: ListDelta<T>): boolean {
        const [item] = listDeltaApply(this.log.predicted, x)
        if (!item) return false

        this.log.pending.push(x)
        this.log.predicted = item
        return true
    }
    pull(x: ListDelta<T>) {
        const [gold] = listDeltaApply(this.log.golden, x)
        if (!gold) return
        this.log.golden = gold

        if (x.session == this.session) {
            // trim any pending steps that are accepted
            if (this.log.pending.length && x.lsn == this.log.pending[0].lsn) {
                this.log.pending.shift()
            }
        } else {
            // rebase our pending steps and create a new prediction
            let pend: ListDelta<T>[] = []
            for (let o of this.log.pending) {

            }
            this.log.pending = pend
            this.notifyListeners()
        }
    }
}

export function listDeltaApply<T>(item: T[], delta: ListDelta<T>)
    : [T[] | undefined, T[]] {
    const r: T[] = []
    const removed: T[] = []
    let j = 0
    let d = 0
    for (let i = 0; i < delta.op.length; i++) {
        switch (delta.op[i]) {
            case keep:
                r.push(...item.slice(j, j + delta.count[i]))
                j = j + delta.count[i]
                break
            case insert:
                r.push(...delta.data.slice(d, d + delta.count[i]))
                d += delta.count[i]
                break
            case skip:
                removed.push(...item.slice(j, j + delta.count[i]))
                j = j + delta.count[i]
                break
        }
    }
    return [r, removed]
}

// create a delta that creates a list from an empty list
export function listDeltaFromArray<T>(lsn: Lsn, item: T[]) {
    return new ListDelta<T>(lsn, new Uint8Array([insert]), [item.length], item, 0)
}