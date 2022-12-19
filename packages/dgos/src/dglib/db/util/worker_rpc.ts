

type PromisePair = { resolve: (x: any)=>void, reject: (x: any)=>void }

export interface Rpc {
    method?: string
    id?: number
    params?: any
    result?: any
    error?: any
}


// wrapper around worker support
export class WorkerRpc {
    w: Worker
    waiting = new Map<number, PromisePair>
    method = new Map<string, (params: any)=>Promise<any>>
    resolve: any
    reject: any
    next = 42

    addMethod(method: string,fn: (params: any)=>Promise<any>){
        this.method.set(method,fn)
    }

    constructor(s: string) {
        this.w = new Worker(s)
        this.w.onmessage = (m) => {
            const r = m.data as Rpc
            if (r.method){
                const fn = this.method.get(r.method)
                if (fn) {
                    fn(r.params).then((v)=>{
                        try {
                            this.w.postMessage({
                                id: r.id,
                                result: v
                            })
                            }catch(e){
                                this.w.postMessage({
                                    id: r.id,
                                    error: e
                                })
                            }
                     })
                }
            } else {
                const p = this.waiting.get(m.data.id)
                if (!p) return
            }
        }
        this.w.onerror = (e) => {
            throw e
        }
    }
    // how do we retrieve the task to cancel it? when do we want to?
    async ask(method: string, params?: any ): Promise<any> {
        this.w.postMessage({
            method: method,
            tag: this.next,
            params: params
        })
       
        const r= new Promise((resolve, reject) => {
            this.waiting.set(this.next, {
                resolve,
                reject
            })

        })
        this.next++
        return r
    }
}