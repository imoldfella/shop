import { createDb } from '../lib/main'
// app global things.

export const Db =   createDb(localStorage.dgdbRestore)