import { faker } from '@faker-js/faker'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toggle, Autocomplete, FloatingSearch, Scroller, ScrollerProps, Snapshot } from '../lib'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (
    <div><FloatingSearch />
      <ChatList /></div>
  )
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



function ChatList() {
  const sopts: ScrollerProps<Chat> = {
    container: root!,
    items: chats,
    // builder takes a T and creates dom from it.
    builder(chat: Chat | null, old: HTMLElement) {
      old.innerHTML = chat ? `<p>${chat.message}<p>` : '<p>tombstone</p>'
    },
    onUpdate: () => { }
  }
  return Scroller(sopts)

}
