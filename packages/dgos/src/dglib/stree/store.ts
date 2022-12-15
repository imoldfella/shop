//import * as idb from 'idb'

// defining size classes of

// low high low high
type BlobRange = Uint32Array
// low high
type DiskPointer = Uint32Array

// store 64K blobs, 
export class Store {
    db: IDBDatabase = new IDBDatabase()
    storage: any
    constructor() {
        const r = indexedDB.open("datagrove", 1)
        r.onsuccess = (event )=>{
            this.db = r.result;
            let storage = new IndexedDBStorage(this.db);
        }
    }
   



    // typically we might want to read the header, then read just the range of columns that we need. only used on parquet format. For these the parquet file is stored in a sequence of 64K blobs.
    partialReadPage() {
        const getBlobs = (x: BlobRange, target: Uint32Array) => {

        }
    
    }
    // reading a page could be 
    async readPage(d: DiskPointer, target: Uint32Array ) : Promise<boolean>{
        this.db.re
        return false
    }
    writePage() {

    }
}