
// org -> host
// a database is a url like snapshot.froov.net/branch/language/{tab}/
// using a snapshot is not good for deep links.
// app.datagrove.com/org/forum
// loads the dgos, then loads the current snapshot and gives appropriate keys.
// branch - 
export class Db {


    static async open(url: string, key: Uint8Array): Promise<Db> {
        return new Db()
    }
}

