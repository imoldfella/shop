
import { ChangeNotifier } from '../core'



export class Entry<K, V> {

}
// queryies need to be observable.
export class Query<K, V> extends ChangeNotifier {
    get length() {
        return 0
    }
    async slice(from: K, to: K): Promise<Entry<K, V>[]> {
        return [];
    }

}
// materialized
class TaggedDatabase {
    view = new Map<string, View<any, any>>
}
class View<K, V> {


    async Search(query: String): Promise<Query<K,V>>{
        return new Query<K,V>()
    }
    
}

// should be generated
class ServerDb {

}
// a toc is a tree, not a set. It could be recursive, or not.
// it could be a prosemirror document.
class TocSchema {
    
}

// maybe the public mode can only view tags, since they are releases.
// public mode 
export class Fs {
    async readFile(path: string): Promise<Uint8Array> {
        return new Uint8Array()
    }
    query(from: string, to: string) {

    }
    get length() {
        return 0
    }
}