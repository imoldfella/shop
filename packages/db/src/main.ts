
import { faker } from '@faker-js/faker'
import { Dx, Snapshot, Scroller } from '../lib'


const dx = new Dx

interface Chat {
    message: string
    avatar: string
}
let count = 0
function randomChat(): Chat {
    return {
        message: count++ + ". " + faker.lorem.paragraph(),
        avatar: faker.image.avatar()
    }
}
const chats = [...new Array(100)].map(e => randomChat())
const root = document.getElementById('root')
// we should try to limit the number of creates


function foo() {
    const s = new Scroller<Chat>(root!, {
        items: chats,
        // builder takes a T and creates dom from it.
        builder(chat: Chat | null, old: HTMLElement) {
            old.innerHTML = chat ? `<p>${chat.message}<p>` : '<p>tombstone</p>'
        },
    })

}
foo()

/*
// to generate
export class Query2 {

}

async function query2(dx: Dx,props: {} ) : Promise<Snapshot<Query2>> {
    let count = 0
    let fn = (n: number) => new Query2
    return new Snapshot<Query2>(count, fn)
}

// needs to be wrapped in a useEffect
type Query2Scroller = ScrollerView<Query2>
function test(props: {
    dom: HTMLElement 
    changeSelection?: (x: Query2Scroller )=>void
    changeScroll?: (x:Query2Scroller)=>void
}) {
    const dx = useDx()
    // create a snapshot
    const q = query2(dx)

    // create a scroller from the snapshot
    const s = new ScrollerView<Query2>(dom,builder,tombstone)
    // listen to the snapshot.
    
}


*/
