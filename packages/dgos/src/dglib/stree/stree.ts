

export class BlockStore {

}


class Buffer {
    b = new SharedArrayBuffer(512 * 1024)
}
// pages can be 64K, 128K, 256K, or entire buffer (512K to 2GB)
class Page {
    constructor(
        public b: Buffer,
        public size: number,
        public offset: number
    ){
    }
}
class BufferPool {
    buffer: Buffer[] = []

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


class Tree {
     
}

// tree with fixed root that points to other trees
class TreeTree extends Tree {

}

export class Ustore extends TreeTree {
    
}