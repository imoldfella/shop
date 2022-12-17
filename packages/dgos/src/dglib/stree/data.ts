
// low high low high
export type BlobRange = Uint32Array
// low high
export type DiskPointer = Uint32Array

function onerror() {
    console.log("error!!")
}

// opfs is sync, but idb is not
export interface StoreFile {
    truncate(len: number): Promise<void>
    flush(): Promise<void>
    close(): Promise<void>
    write(a: ArrayBuffer, opt?: { at: number }): number
    read(a: ArrayBuffer, opt?: { at: number }): number
    getSize(): Promise<number>
}


// store 64K blobs, 
export interface Store {

    remove(path: string): Promise<void>
    create(path: string): Promise<StoreFile>
    open(path: string): Promise<StoreFile>

    // readPage(d: DiskPointer, target: Uint32Array, then: (d: DiskPointer, status: number) => void): void
    // writePage(d: DiskPointer, target: Uint32Array, then: (d: DiskPointer, status: number) => void): void
    // writeLog(target: Uint32Array, then: (d: DiskPointer, status: number) => void): void
    //readTail(): Promise<Uint32Array>


}

