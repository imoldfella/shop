
export class Mem {
    mem = new WebAssembly.Memory({
        initial: 1024,
        maximum: 64 * 1024,
        shared: true
    })
    next = 0

    
    allocPages(pages: number): ArrayBuffer {
        const len = pages * 64 * 1024
        const r = new Int32Array(this.mem.buffer, this.next, len)
        this.next += len
        return r
    }
    allocLines(lines: number): Int32Array {
        const len = lines * 64
        const r = new Int32Array(this.mem.buffer, this.next, len)
        this.next += len
        return r
    }
}