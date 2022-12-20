import { Rpc } from "../util/worker_rpc"


function dispatch(r: Rpc, send: (r: Rpc) => void) {

}

onmessage = (e) => {
    dispatch(e.data, (r: Rpc) => { postMessage(r) })
}