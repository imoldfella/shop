
// we can use localstorage for the cart
// we can use unique ids to capture the idea of unique bundles of cpt's.


// line = { code, desc}
// don't know network here? might we?
async function addCart(id) {
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