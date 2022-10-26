import React, { Context, useReducer } from 'react'

export function MyButton() {
    return (<div>hello</div>)
}



// we can use localstorage for the cart
// we can use unique ids to capture the idea of unique bundles of cpt's.

// change this to pull id from database instead of json file
// 

// create sku_table = ()
class Database {


}

class TableReader {

    Query<T>(begin: T, end: T) {

    }
}


// to use create a context React.CreateContext
export class Cart {
   dispatch = {} as React.Dispatch<CartTx> 
   constructor(){

   }
}

export interface CartTx {

}

export function CartProvider(props: {cart: Context<Cart>,children?: React.ReactNode}) {
    const reducer = (x: CartTx):CartTx =>{
        return x
    }
    const store = new Cart()
    const [st,dispatch] =useReducer(reducer, store)
    store.dispatch = dispatch
    const Pr = props.cart.Provider
    return (<Pr value={store} >{props.children}</Pr>)
}

// line = { code, desc}
// don't know network here? might we?
async function addCart(id: string) {
    var rs = await fetch("/" + id + ".json")
    if (!rs.ok) {
        console.log("fetch failed " + id)
        return
    }
    var fm = await rs.json()
    console.log(id, fm)
    if (fm && fm.ironshopLines) {
        var cart = JSON.parse(localStorage.cart || "[]")
        cart = [...cart, ...fm.ironshopLines]
        localStorage.cart = JSON.stringify(cart)
        location.href = "/cart.html"
    }
}