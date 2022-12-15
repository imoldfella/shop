

// tree built to share with sharedarraybuffer
// lsm where mem tree is a pam tree

export class BlockStore {

}
export class CacheTable {
    //
}
export class DenseTable {
    b = new SharedArrayBuffer(1024 * 1024 * 1024)
}

export class Stree {
    b = new SharedArrayBuffer(1024 * 1024 * 1024)
    v
    constructor() {
        this.v = new Uint32Array(this.b)
    }


}

export class Page {

}