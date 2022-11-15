import React,{useState} from 'react'
import {XMarkIcon,ChevronLeftIcon,ChevronRightIcon,ShoppingCartIcon  } from '@heroicons/react/20/solid'
import codes from './shop500.json'

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


export function Result(props:{title: string, subtitle: string}){
    return (<div className="fileList hover:bg-slate-900">
        <a className="fl-tool pl-4">
            <ShoppingCartIcon className='h-6 w-6'/>
        </a>
        <a className="card" href="#">
            <div className="fl-title"><span>{props.title}</span></div>
            <div className="fl-subtitle"><span>{props.subtitle}</span></div>
        </a>
        <a className="fl-tool" href="#">
            <ChevronRightIcon className='w-6 h-6'/>
        </a>
        </div>)
}

export function Button(props: React.PropsWithChildren<{
    onClick: ()=>void
}>) {
    return (<div className="navbar-right opacity-50 hover:opacity-100">
        <button aria-label="edit" className="navbar-tool"  onClick={props.onClick}>{props.children}</button>
    </div>)
}

export function Search() {
    const [search,setSearch] = useState('')

    let results = codes;
    if (search) {
        results = []
        var s = search.toLowerCase()
        results = codes.filter((e) => e.ENT[0]==search || (e.ENT[1]+"").includes(s))
    }

    const oninput = (e: any)=>{
        if (!e) return
        const v = (e.target as HTMLInputElement)?.value??""
        setSearch(v)
    }

    return (<div><nav className="searchbar" role="navigation" aria-label="main navigation">

      <Button onClick={()=>history.back()}>
        <ChevronLeftIcon className='h-6 w-6' />
    </Button>


    <input id="s1" value={search}
        className=' bg-transparent focus:outline-none text-sm'
     autoFocus type="text" placeholder="Search for service" onInput={oninput}/>

    <Button onClick={()=>setSearch('')}>
        <XMarkIcon className='h-6 w-6' />
    </Button>


    </nav>
    { results.map((e) => (<Result title={e.ENT[1]+""} subtitle={e.ENT[0]+""} />))}
    
    </div>)
}  


{/* <div className="navbar-right">
        <button aria-label="edit" className="navbar-tool"  onClick={}><XMarkIcon className='h-6 w-6' /></button>
    </div> */}