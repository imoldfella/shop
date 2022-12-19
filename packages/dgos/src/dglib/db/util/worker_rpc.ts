

type PromisePair = { resolve: (x: any) => void, reject: (x: any) => void }

export interface Rpc {
    method?: string
    id?: number
    params?: any
    result?: any
    error?: any
}

export interface CanSend {
    postMessage(x: any): void
}

type Method = (params: any) => Promise<any> 

export class RpcClient {
    waiting = new Map<number, PromisePair>()
    method = new Map<string, Method>()
    resolve: any
    reject: any
    next = 42

    constructor(public w: CanSend) { }
    recv(r: Rpc) {

        if (r.method) {
            const fn = this.method.get(r.method)
            if (fn) {
                fn(r.params).then((v) => {
                    try {
                        this.w.postMessage({
                            id: r.id,
                            result: v
                        })
                    } catch (e) {
                        this.w.postMessage({
                            id: r.id,
                            error: e
                        })
                    }
                })
            }
        } else {
            const p = this.waiting.get(r.id ?? 0)
            if (!p) return
        }
    }
    addMethod(method: string, fn: (params: any) => Promise<any>) {
        this.method.set(method, fn)
    }

    async ask(method: string, params?: any): Promise<any> {
        this.w.postMessage({
            method: method,
            tag: this.next,
            params: params
        })

        const r = new Promise((resolve, reject) => {
            this.waiting.set(this.next, {
                resolve,
                reject
            })

        })
        this.next++
        return r
    }
}

// wrapper around worker support
export class WorkerRpc extends RpcClient {
    w: Worker
    constructor(s: string) {
        super(new Worker(s))
        this.w = super.w as Worker
        this.w.onmessage = (m) => {
            super.recv(m.data as Rpc)
        }
    }
}
class SharedWorkerWrapper {
    w
    constructor(x: string) {
        this.w = new SharedWorker(x)
    }
    postMessage(x: any){
    }
}

export class SharedWorkerRpc extends RpcClient {
    w: SharedWorkerWrapper
    constructor(s: string) {
        super(new SharedWorkerWrapper(s))
        this.w = super.w as SharedWorkerWrapper
        this.w.w.port.start()
        this.w.w.port.onmessage = (m) => {
            super.recv(m.data as Rpc)
        }
    }
}