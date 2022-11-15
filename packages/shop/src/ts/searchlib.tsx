// subtitle, title, service code
const data: any[] = []
var hidden: any[] = []
var el: any[] = []

// line = { code, desc}
// don't know network here? might we?
export async function addCart(id: string) {
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
// worth using preact at all? isn't preact just setting dom anyway?

const s1 = document.getElementById('s1') as HTMLInputElement
export function clearSearch() {
    s1.value = ""
    search()
}
export function search() {
    var s = s1.value.toLowerCase()
    console.log("search", s)
    for (var i = 0; i < hidden.length; i++) {
        var h = !(data[3 * i].includes(s) || data[3 * i + 1].includes(s))
        if (h != hidden[i]) {
            el[i].style.display = h ? "none" : "grid"
        }
    }
}
// two types of links, shopping cart puts directly into cart
// other goes to reference page.

export function clickCart(event: MouseEvent) {
    const id = idOf(event.target as HTMLElement)
    if (id) addCart(id)
    window.location.href = "cart.html"
}
export function clickView(event: MouseEvent) {
    //console.log("view ", idOf(event.target))
    window.location.href = idOf(event.target as HTMLElement) + ".html"
}
export function idOf(el: HTMLElement | null): string | null {
    if (!el) return el
    if (el.id) return el.id
    else return idOf(el.parentElement)
}
export function init() {
    fetch("search.json")
        .then(response => response.json())
        .then(data => init2(data))
}
export function init2(d: string[]) {
    let data = d
    hidden.length = data.length / 3
    el.length = hidden.length

    var results = document.getElementById('results')!
    var t1 = results.children[0]
    el[0] = t1
    for (var i = 0; i < hidden.length - 1; i++) {
        var o = t1.cloneNode(true)
        results.appendChild(o)
        el[i + 1] = o
    }
    for (var i = 0; i < hidden.length; i++) {
        var desc = data[i * 3]
        var code = data[i * 3 + 1]
        data[i * 3] = desc.toLowerCase()
        data[i * 3 + 1] = code.toLowerCase()
        var id = data[i * 3 + 2]
        el[i].id = id

        const dx = el[i].querySelectorAll('span')
        dx[0].innerHTML = desc
        dx[1].innerHTML = code

        var a = el[i].querySelectorAll('a')
        a[0].addEventListener('click', clickCart)
        a[1].addEventListener('click', clickView)
        a[2].addEventListener('click', clickView)
    }
}
