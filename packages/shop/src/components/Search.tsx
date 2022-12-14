// import React,{useState} from 'react'
import { Icon } from "solid-heroicons"
import { xMark, chevronLeft, chevronRight, shoppingCart } from 'solid-heroicons/solid'

import { createSignal, ComponentProps, ParentProps } from 'solid-js'
import type { ProcCode } from "../claims"
import { CodeItem } from './CodeItem'

// subtitle, title, service code
const data: any[] = []
var hidden: any[] = []
var el: any[] = []

// line = { code, desc}
// don't know network here? might we?
export async function addCart(id: string) {
    // var rs = await fetch("/" + id + ".json")
    // if (!rs.ok) {
    //     console.log("fetch failed " + id)
    //     return
    // }
    // var fm = await rs.json()
    // console.log(id, fm)
    // if (fm && fm.ironshopLines) {
    //     var cart = JSON.parse(localStorage.cart || "[]")
    //     cart = [...cart, ...fm.ironshopLines]
    //     localStorage.cart = JSON.stringify(cart)
    //     location.href = "/cart.html"
    // }
}
// worth using preact at all? isn't preact just setting dom anyway?


// two types of links, shopping cart puts directly into cart
// other goes to reference page.




export function Button(props: ParentProps<{
    onClick: () => void,
}>) {
    return (<div class="navbar-right opacity-50 hover:opacity-100">
        <button aria-label="edit" class="navbar-tool" onClick={props.onClick}>{props.children}</button>
    </div>)
}

export function Search({codes}: {
    codes: ProcCode[]
}) {
    const [search, setSearch] = createSignal('')

    let results = () => {
        var s = search().toLowerCase()
        return s ? codes.filter((e: Code) => [e.code + " " + e.description.short].join(" ").toLowerCase().includes(s)) : codes
    }

    const oninput = (e: any) => {
        if (!e) return
        const v = (e.target as HTMLInputElement)?.value ?? ""
        setSearch(v)
    }

    return (<div><nav class="searchbar" role="navigation" aria-label="main navigation">
        <Button onClick={() => history.back()}>
            <Icon path={chevronLeft} class='h-6 w-6' />
        </Button>


        <input id="s1" value={search()}
            class=' bg-transparent focus:outline-none text-sm'
            autofocus type="text" placeholder="Search for service" onInput={oninput} />

        <Button onClick={() => setSearch('')}>
            <Icon path={xMark} class='h-6 w-6' />
        </Button>


    </nav>
        {results().map((e: Code) => (<CodeItem title={e.description.short} subtitle={e.code} code={e.code} />))}

    </div>)
}

interface Code {
    code: string
    description: {       
        short: string,
        long: string,
        gpt3: string     
    }
}

{/* <div class="navbar-right">
        <button aria-label="edit" class="navbar-tool"  onClick={}><XMarkIcon class='h-6 w-6' /></button>
    </div> */}