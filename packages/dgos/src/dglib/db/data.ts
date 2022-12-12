
// it's not clear that 53 bits is enough for a version id.
// maybe rid should encapsulate the id of version though?
// ever rid would then point to immutable thing.
// Uint8Array's can't be keys, so would need to hex them.

export type Rid = string

// https://www.jsonrpc.org/
export interface Rpc {
    method: string,
    id: any,
    params: any,
    result: any
}

export interface Tab {
    rid: string

    name: string
    avatar: string
    count: number
    level: number
}
export type Tabx = Tab & {
    selected: boolean
}


const keep = 0
const insert = 1
const skip = 2

type Lsn = number

// how should we rebase this? what do we need to keep?
// prosemirror keeps centrally what we need to put in a log.
export class ListDelta<T> {
    constructor(
        public lsn: number,
        public op: Uint8Array,
        public count: number[],
        public data: T[],
        // session should be committed atomically with the log state.
        public session: number
    ){}

    static apply<T>(gold: Snapshot<T>,delta: ListDelta<T>) : [Snapshot<T>|undefined,T[]] {
        if (delta.lsn!=gold.lsn+1) {
            return [undefined,[]]
        }
        const {lsn,item} = gold
        const r : T[] = []
        const removed: T[]=[]
        let j=0
        let d=0
        for (let i=0; i<delta.op.length; i++) {  
            switch(delta.op[i]){
            case keep:
                r.push(...item.slice(j,j+delta.count[i]))
                j = j+delta.count[i]
                break
            case insert:
                r.push(...delta.data.slice(d,d+delta.count[i]))
                d+=delta.count[i]
                break
            case skip:
                removed.push(...item.slice(j,j+delta.count[i]))
                j = j+delta.count[i]
                break
            }
        }
        return [{lsn: delta.lsn, item: r } ,removed]
    }

    // create a delta that creates a list from an empty list
    static fromArray<T>(lsn: Lsn, item: T[]) {
        return new ListDelta<T>(lsn,new Uint8Array([insert]), [item.length], item,0)
    }
}

export function getRandom() : number {
    const r=new BigUint64Array(1)
    window.crypto.getRandomValues(r)
    return Number(r[0])
}


// handle race conditions and rebasing.
// this needs to handle multiple steps in a tree arrangement

export interface Snapshot<T> {
    lsn: Lsn
    item: T[]
}

export interface DeltaLog<T> {
     golden: Snapshot<T>
     pending: ListDelta<T>[]
     predicted: Snapshot<T>
}

export class DeltaMgr<T> {
    listener = new Set<()=>void>
    addListener(fn: ()=>void) {} 
    removeListener(fn: ()=>void) {
        this.listener.delete(fn)
    }   
    notifyListeners() {
        this.listener.forEach(e=>e())
    }
    session: number
    constructor(public log: DeltaLog<T>){ 
        this.session = getRandom()
    }
    // we can only apply a change to the log if its the most recent we have seen. If we accept a change we are responsible for transforming it to the next level.
    // there is a hybrid approach where we can apply commutive steps, but these are limited because any delete is generally not commutative.
    tryApply(delta: ListDelta<T>[]) : boolean{
        return true
    }

    static fromSnapshot<T>(sn: Snapshot<T>) {
        return new DeltaMgr<T>({
            golden: sn,
            pending: [],
            predicted: sn
        })
    }

    push(x: ListDelta<T>) : boolean{
        const [item] = ListDelta.apply(this.log.predicted, x)
        if (!item) return false

        this.log.pending.push(x)

        this.log.predicted = {
            lsn: this.log.predicted.lsn+1,
            item
        }
        return true
    }
    pull(x: ListDelta<T>) {
        const [gold] = ListDelta.apply(this.log.golden, x)
        if (!gold) return
        this.log.golden = gold
         
        if (x.session == this.session) {
            // trim any pending steps that are accepted
            if (this.log.pending.length && x.lsn == this.log.pending[0].lsn){
                this.log.pending.shift()
            }
        } else {
            // rebase our pending steps and create a new prediction
            let pend : ListDelta<T>[] = []
            for (let o of this.log.pending) {

            }
            this.log.pending = pend
            this.
            this.notifyListeners()
        }
    }
}
