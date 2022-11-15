

// an eob can return multiple networks
// each is displayed as a card.
// each needs to be keyed to a client specific schema
// so we know how to present it.


// eob schema's are driven by plan rules and user elections
// each line has a network, but to hypotheticate, we can
// set them all to that network and readjudicate

// member here may be a more general "credentials"

// member is a store that can cache things according to some policy
// how can we declare pdfmake?

// we could put cart into this? there can't really be more than one cart per member
class Member {
    id = ""

    async getCounters(covered: string): Promise<CounterMap> {
        // this has to be an async, await , fetch, cache for time
        return {
            'life': {
                pocket: 123,
                deduct: 123,
            },
            'family': {
                deduct: 256,
                pocket: 256
            }
        }
    }

    async getPlan(year: number): Promise<PlanRules> {
        function planRules1(): Network {
            return {
            }
        }
        // some extra complication here in case we want some rules
        // that are not strictly per network. maybe maxes should be here.
        // It's not clear that thing like lines should be different either
        // what should be different then?
        return {
            counter: {
                'life': {
                    deduct: 1800,
                    pocket: 7000,
                },
                'family': {
                    deduct: 4200,
                    pocket: 12000,
                }
            },
            network: {
                "in": planRules1(),
                "out": planRules1()
            },
            style: {
                network: [{ key: 'in', name: 'In Network' },
                { key: 'out', name: 'Out of Network' }],
                counter: [
                    // keys match to member counters
                    //  there are counters per life and per member.
                    { name: 'Out of Pocket', set: 'life', key: 'pocket' },
                    { name: 'Deductible', set: 'life', key: 'deduct' },
                    { name: 'Family Out of Pocket', set: 'family', key: 'pocket' },
                    { name: 'Family Deductible', set: 'family', key: 'deduct' }
                ],
                claim: [
                    { name: 'You Owe', key: 'owe' },
                    { name: 'Charge', key: 'charge' },
                    { name: 'Plan paid', key: 'paid' }
                ],
                line: [
                    {
                        name: 'Description',
                        key: 'desc'
                    },
                    {
                        name: 'Code',
                        key: 'code'
                    },
                    {
                        name: 'Charge',
                        key: 'charge'
                    },
                    {
                        name: 'Allowed',
                        key: 'allowed'
                    },
                    {
                        name: 'Paid',
                        key: 'paid'
                    },
                    {
                        name: 'Member Owes',
                        key: 'owe'
                    },
                    {
                        name: 'Deductible',
                        key: 'deduct'
                    },
                    {
                        name: 'Copay',
                        key: 'copay'
                    },
                    {
                        name: 'Coinsurance',
                        key: 'coins'
                    },
                ]
            }
        }
    }

}

type CounterMap = {
    [index: string]: {
        [index: string]: number
    }
}

interface PlanRules {
    counter: CounterMap
    network: {
        [index: string]: Network
    }
    style: PlanStyle
}

interface PlanStyle {
    network: NamedKey[]
    counter: CounterKey[]
    claim: NamedKey[]
    line: NamedKey[]
}
interface Network {
}

// eventually support cart edits (like +/-) with re-render.
// because we use local storage we can even keep the cart open
// in another window! (flex)
// we might want to cache the plan rules? caching has its downsides

// we might want more state in here than just lines? maybe location
// of the user right now.
class Eob {
    member: Member
    plan: PlanRules
    covered = ""
    year = 2022
    constructor(member: Member, plan: PlanRules) {
        this.member = member
        this.plan = plan
    }

    line: EobLine[] = []
    counter: CounterMap = {}

    charge = 0
    allowed = 0
    paid = 0
    owe = 0
    copay = 0
    deduct = 0
    coins = 0
}

interface CounterLine {
    name: string
    counter: number
    max: number
}

interface ShoppableLine {
    code: string
    desc: string
}
interface EobLine extends ShoppableLine {
    network: string
    charge: number
    allowed: number
    paid: number
    owe: number
    copay: number
    deduct: number
    coins: number
}

interface NamedKey {
    name: string
    key: string
}
interface CounterKey {
    name: string
    key: string
    set: string
}
interface EobFormat {
    claim: NamedKey[]
    counter: CounterKey[]
    line: NamedKey[]
}

// we can use line 0 for totals;
// each line of the cart indicates the network
// each user has their own set of counters that we need to fetch from server. counters 

async function adjudicate1(eob: Eob): Promise<void> {
    const member: Member = eob.member
    const plan = await member.getPlan(2020)
    eob.counter = await member.getCounters(eob.covered)

    // as we adudicate the claim we update the counters and summary
    for (let i of eob.line) {
        i.code
        i.desc
        i.network

        // set everything here, nothing comes into the cart
        i.charge = 100
        i.allowed = 80
        i.paid = 80
        i.owe = 0
        i.deduct = 0
        i.copay = 0
        i.coins = 0

        // adjust sums and maxes
        eob.charge += i.charge
        eob.allowed += i.allowed
        eob.owe += i.owe
        eob.paid += i.paid
    }
    //console.log(eob)
}

// for an empty cart this shows current state
// for an aeob, it shows after the claim
function renderCounters(eob: Eob) {
    // console.log(eob)
    const style = eob.plan.style
    const renderCounter = (ck: CounterKey) => {
        const paid = eob.counter[ck.set][ck.key]
        const maxpay = eob.plan.counter[ck.set][ck.key]

        return `<div class='sumChart'>
            <div class='sumLeft'>${ck.name}</div>
            <svg width='100%' preserveAspectRatio='none' height='24px' viewBox='0 0 320 24'>
                <g class='bars'>
                    <rect class='bg' fill='#ccc' width='100%' height='25'></rect>
                    <rect class='data' fill='#0074d9' width='45%' height='25'></rect>
                </g>
                <div class='sumRight'>${paid} paid of a maximum ${maxpay}</div>
            </svg>
        </div>`
    }
    return style.counter.map(e => renderCounter(e)).join("")
}

function renderCard(eob: Eob, name: string) {
    // console.log("render", eob)
    // var data = eob.plan.network[cardSchema.key]
    const style = eob.plan.style
    const memberPay = eob.owe

    const datax = eob as any
    const claim = style.claim.map(e => `
                <tr><td class='data1'>${e.name}</td><td class="ncol">${datax[e.key].toFixed(2)}</td></tr>`).join("")
    // lines have to mapped in the order we receive in eob
    // headers in the order of the schema
    const line = eob.line.map((m) => {
        var ln = ""
        const d = m as any
        for (var j = 0; j < style.line.length; j++) {
            const v = d[style.line[j].key] || 0
            if (j == 0) {
                ln += `<td class='fix'><div>${v}</div></td>`
            } else {
                ln += `<td class="ncol">${v}</td>`
            }
        }
        return `<tr>${ln}</tr>`
    }).join("")


    const header = style.line.slice(1).map(e => `<th class="ncol">${e.name}</th>`).join("")
    return `<div class="card">
                <h1>Your Cost ${name}</h1>
                <h2>$${memberPay}</h2>
                <p> If
                    you choose an in-network provider you can expect to be responsible for $${memberPay} This is a good faith
                    estimate of your responsibility for payment given the services
                    selected in this cart.</p>
                <table class="data">
                ${claim}
                </table>
                <div class="wrapper">
                    <table class="scrollTable">
                        <thead>
                        <th class="fix"></th>${header}
                        </thead><tbody>
                ${line}
                </tbody></table></div>
                ${renderCounters(eob)}</div>`
}

// are all plans calendar year?
// children can sometimes have different rules than adults by law

async function renderCart(cart: Eob): Promise<string> {
    if (cart.line.length == 0) {
        cart.counter = await member.getCounters(cart.covered)

        return `<div class="card">
        <h1>Plan Status</h1>
        <p></p>
          ${renderCounters(cart)}
      </div>`
    }
    const style = cart.plan.style

    var cards = []
    for (const o of style.network) {
        // set each line to that network, then adjudicate the claim
        for (let i of cart.line) {
            i.network = o.key
        }
        await adjudicate1(cart)
        cards.push(renderCard(cart, o.name))
    }

    return ` <div class="cardList">
                ${cards.join("")}
                </div>
            `
}

function clearCart() {
    // console.log("clear")
    localStorage.cart = "[]"
    updateCart()
}


// eventually support cart edits (like +/-) with re-render.
// because we use local storage we can even keep the cart open
// in another window! (flex)
// we might want to cache the plan rules? caching has its downsides


// we need to load the member state from localStorage each time the page
// loads and if the cart is newer than the member state we need to adjudicate
// again.

// member has methods, so we can't store it directly.
let member = new Member
async function updateCart() {
    const plan = await member.getPlan(2020)
    let eob = new Eob(member, plan)
    eob.line = JSON.parse(localStorage.cart || JSON.stringify('[]'))


    // the cart is empty then show just the counters

    let d = document.getElementById('content')
    if (d) {
        d.innerHTML = await renderCart(eob)
    }
}

// line = { code, desc}
// don't know network here? might we?

function addOne() {
    //console.log("add one")
    function addCart(lines: ShoppableLine[]) {
        var cart = JSON.parse(localStorage.cart || "[]")
        cart = [...cart, ...lines]
        window.localStorage.cart = JSON.stringify(cart)
    }
    addCart([
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
    ])
    updateCart()
}




/*

[
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
        {
            code: '70450',
            desc: ' CT scan head or brain without dye'
        },
    ]
*/