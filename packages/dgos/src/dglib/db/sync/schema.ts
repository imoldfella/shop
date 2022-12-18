import { Db, TxMgr } from "../client"
import { BranchHandle } from "./util"


// device.table, user.table, shared.table(branchset, branch )
// 

// maybe instead of db we need to take a branch handle?
// or maybe branch is an argument as well? or maybe branch needs to be

// the user has a "read" count per branch, this is shared across all devices

// update online  ... where branch='temp'
export interface UpdateOnlineTx {
    url: string
    status: string   
}
export function updateOnlineTx(tx: TxMgr, props: UpdateOnlineTx) {

}

export async function updateOnline(db: Db, props: UpdateOnlineTx) {
   const tx = db.begin()
   updateOnlineTx(tx, props)
   await tx.commit()
}


// note that read, written
// create table device.tracking(branchid, read, written)
export interface UpdateTracking {
    
}

export function updateTracking(db: Db, props: UpdateTracking){

}