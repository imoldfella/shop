import { StoreFile, useFs } from "../../opfs"
import { LogHeader } from "./log_buffer"



export class LogReader {
    constructor(public fh: StoreFile[]) {

    }
}

export async function useLogReader(): Promise<LogReader> {
    const fs = await useFs();
    const fh = [
        await fs.open("log0"),
        await fs.open("log1")
    ]
    return new LogReader(fh)
    // the first x bytes of the log file is a log header
    // the one with the most advanced log pos is the active segment

}


// const offer = useLogWriter(buffer)
// const [b, commit()] = offer(10)  // 10 words = 40 bytes.
// b.set( [  ])
// commit()

type LogWriter = [Int32Array, () => void]

const maxMessage = 1 * 1024 * 1024

// header needs to identify the branch and the user identity.
// log buffer can already be associated with a server?
// the sync service is reading the log, what does it need? just the sandbox, but how do we recover/restart?
export function useLogWriter(props: {
    sm: Int32Array
    sandbox: number
}) {
    const lh = new LogHeader(props.sm)
    return (offer: Uint8Array): LogWriter => {
        if (offer.length > maxMessage) {

        }
        // atomic add offer to the tail. spin until there is enough space
        const b = BigInt(offer.length)
        while (true) {
            const a = lh.addTail(b)
            while (lh.sm64[LogHeader.avail] < a);
            const [fst, snd] = lh.slice(a, a + b)
            if (!snd) {
                return [fst.slice(1), () => {
                    // set the entry as committed.
                    fst[0] = fst[0] | 1
                    lh.notify()
                }]
            } else {
                // don't bother with split buffers, just pad and try again
                fst[0] = fst[0] | 3  // set pad and commit.
            }
        }
    }
}