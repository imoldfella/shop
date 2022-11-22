// import React,{useState} from 'react'
import { Icon } from "solid-heroicons"
import { xMark, chevronLeft, chevronRight, shoppingCart } from 'solid-heroicons/solid'
import codes from './shop500.json'
import { createSignal, ComponentProps, ParentProps } from 'solid-js'

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


export function Result(props: { title: string, subtitle: string, code: string }) {
    return (<div class="fileList hover:bg-slate-900">
        <a class="fl-tool pl-4">
            <Icon path={shoppingCart} class='h-6 w-6' />
        </a>
        <a class="card" href={"code/" + props.code}>
            <div class="fl-title"><span>{props.title}</span></div>
            <div class="fl-subtitle"><span>{props.subtitle}</span></div>
        </a>
        <a class="fl-tool" href={"code/" + props.code}>
            <Icon path={chevronRight} class='w-6 h-6' />
        </a>
    </div>)
}

export function Button(props: ParentProps<{
    onClick: () => void,
}>) {
    return (<div class="navbar-right opacity-50 hover:opacity-100">
        <button aria-label="edit" class="navbar-tool" onClick={props.onClick}>{props.children}</button>
    </div>)
}

export function Search() {
    const [search, setSearch] = createSignal('')

    let results = () => {
        var s = search().toLowerCase()
        return s ? codes.filter((e) => e.ENT.join(" ").toLowerCase().includes(s)) : codes
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
        {results().map((e) => (<Result title={e.ENT[1] + ""} subtitle={e.ENT[0] + ""} code={e.ENT[0]} />))}

    </div>)
}


{/* <div class="navbar-right">
        <button aria-label="edit" class="navbar-tool"  onClick={}><XMarkIcon class='h-6 w-6' /></button>
    </div> */}