
import './index.css'


import { Database, Pyramid, TableReader } from '../lib/main'
 
// other core libraries can wrap around the database and then we can create a simple provider for each framwork
const db = new Database

// try read a cors map database.
db.attach("??")


let pyr = new Pyramid(0, 15)


let tr: TableReader

