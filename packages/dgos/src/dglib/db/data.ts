
// it's not clear that 53 bits is enough for a version id.
// maybe rid should encapsulate the id of version though?
// ever rid would then point to immutable thing.
// Uint8Array's can't be keys, so would need to hex them.

// tradeoff of whether to map a log to a partition: more concurrency = potentially bigger lock problem

export type Rid = string

// animation-play-state: running | paused
export interface ColumnSchema {
    name: string
    type: string
    default: string
}
export interface TableSchema {
    column: ColumnSchema[]
}
export interface Schema {
    name: string,
    version: string
    table: {
        [key: string]: TableSchema
    }
}
// branches have dns address org-branch.froov.net for example
export interface Branch {
    name: string
    schema: string
}

// is-a branch.
export class BranchConcierge {
}
export class Table {

}

// if list length is 0, then key is deleted.
// prosemirror is kept using the count map.
export interface TableUpdate {
    table: string
    key: Uint8Array
    delta: ListDelta<any>
}
export interface BranchUpdate {
    lsn: Lsn
    update: TableUpdate[]
}
export type Tx = {
    [branch: string]: BranchUpdate
}

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

export type Lsn = number

// how should we rebase this? what do we need to keep?
// prosemirror keeps centrally what we need to put in a log.
export interface ListDelta<T> {
    lsn: number,
    op: Uint8Array,
    count: number[],
    data: T[],
    // session should be committed atomically with the log state.
    session: number
}


// handle race conditions and rebasing.
// this needs to handle multiple steps in a tree arrangement

export interface ArraySnapshot<T> {
    lsn: Lsn
    item: T[]
}

// a snapshot could be a key prefix + lsn
// then query the prefixed btree normally.
// a layered, deterministic snapshot might be best for distribution. map tile model
export interface Snapshot {
    lsn: Lsn,
    table: {
        [name: string]: TableSnapshot
    }
}
export interface TableSnapshot {
    schema: TableSchema
    item: Btree
}

export interface Btree {

}

export interface DeltaLog<T> {
    golden: ArraySnapshot<T>
    pending: ListDelta<T>[]
    predicted: ArraySnapshot<T>
}


