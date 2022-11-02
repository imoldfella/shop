
import React, { useEffect,useRef } from 'react'
import { ScrollerProps, Scroller as ScrollerTs} from '../../db/lib'


function Scroller<T>(props: ScrollerProps<T>) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if (container.current) return;
        container.current = new ScrollerTs({

        })

    })
    return (<div ref={container}>

    </div>)
}
interface Chat {
    message: string
    avatar: string
}
let count = 0
function randomChat(): Chat {
    count++;
    return {
        message: count + ". " + faker.lorem.paragraph(),
        avatar: faker.image.avatar()
    }
}
const chats = [...new Array(1000)].map(e => randomChat())
const root = document.getElementById('root')
// we should try to limit the number of creates


function foo() {
    const s = new Scroller<Chat>({
        container: root!,
        snapshot: Snapshot.fromArray(chats),
        // builder takes a T and creates dom from it.
        builder(chat: Chat | null, old: HTMLElement) {
            old.innerHTML = chat ? `<p>${chat.message}<p>` : '<p>tombstone</p>'
        },


        // provide a callback to get notified of updates to scroll or data
        // data update is going to change scroll anyway, so having both seems meh.
        onUpdate: () => { }
    })

}
foo()
