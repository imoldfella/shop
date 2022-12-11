
/*
export class DbSharedWorker<T> {

    async serve(method: string, id: number, params: any): Promise<any> {
        switch (method) {
            case 'init':
                this.reply<T>(id, {
                    identity: {
                        username: 'imoldfella',
                        privateKey: new Uint8Array()
                    }
                })
                break;
        }
    }
    reply<T>(id: number, params: T) {
        this.promise.get(id)![0](params)
        this.promise.delete(id)
    }

    promise = new Map<number, [any, any]>
    next = 1
    async rpc(method: string, params: any): Promise<any> {
        const id = this.next++
        let pr = new Promise((resolve, reject) => {
            this.promise.set(id, [resolve, reject])
            this.serve(method, id, params)
        })
    }
    async initialState(): Promise<DbcState> {
        return this.rpc('init', {})
    }
}



interface Identity {
    username: string
    privateKey: Uint8Array
}
interface DbcState {
    identity?: Identity
}

class ServiceWorker {


}



export class Partition {
    branch = 0
    app = ""
    appversion = 0

}

export class DataView {

}
export class Tx {
}




*/
export function ha() {
}