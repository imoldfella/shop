

// Claim -> *pricing* -> PricedClaim -> *sharing* -> Eob

// a plan could be composed of multiple plans, may have user electable options.

export class Claim {
    constructor(public line: ShoppableLine[]){

    }

     static random() {
        return new Claim([
            {
                code: '70450',
                desc: ' CT scan head or brain without dye',
                npi: '1234567890',
                provider: 'Jill, MD'
            },
            {
                code: '70451',
                desc: 'Anesthesia',
                npi: '1234567891',
                provider: 'Joe, MD',
            }
        ])
    }
}

export class Adjudicated {
    constructor(public claim: Claim, public eob: Eob[]){

    }
    // we can do one eob for each plan; for most this will be in and out of network, but for open enrollment, there may be value in having even more plans


    static async adjudicate(claim: Claim, plan: Plan[]) : Promise<Adjudicated> {
        const eob : Eob[] = []
        return new Adjudicated(claim , eob)
    }
}


export interface ShoppableLine {
    // this is pretty universal
    code: string
    desc: string

    // not sure what to do with these
    network?: string | undefined
    npi?: string | undefined
    provider: string | undefined
}

export interface Plan {
    name: string
    contract: Contract[]
    // applies a counter state
    sharing: SharingFn
    adjudicate: AdjudicateFn
}

export function simpleContract(x: string)  : Contract {
    return {
        price: pricing()
    }
}

export function simplePlan(x: string) {
    let contract = simpleContract(x)
    return {
        name: "PPO",
        contract: [
            contract,
        ],
        sharing: sharing(),
        adjudicate: adjudicate(),
        plan: plan()
    }
}

// should just be pricing followed by sharing
type AdjudicateFn = (claim: Claim) => Promise<Eob[]>
export  function adjudicate(): AdjudicateFn {
    return async (claim: Claim)=>{
        return []
    }
}

// the shopper can pick the contract to process the claim under
// some contracts may be more expensive but offer different providers.
// do that though we process it under every contract and coalesce the ones with the same price
export interface Payor {
    login: string,   // a bot handle we can fetch data from
    // this is the list of plans used anonymously
    anonPlan: Plan[]
    plan: PlanFn
}
export type PlanFn = (state: SubscriberState, covered: Covered) => Plan

// maybe these need to be async to allow fetch?
export function simplePayor() : Payor{
    let p = simplePlan("")
    return {
         login: "",
         anonPlan: [
            p
         ],
         plan: (state: SubscriberState, covered: Covered) => p
     }
 }

export function plan() :PlanFn{
    return (state: SubscriberState, covered: Covered) : Plan => {
        throw "not done"
    }
}

// the priced claim may provide some category information too: generic, etc.
type SharingFn = (claim: PricedClaim, subscriber: SubscriberState) => Eob




export function sharing(): SharingFn {
    throw "not done"
    //return (claim: PricedClaim,subscriber: SubscriberState)=>[new Eob(),new SubscriberState()]
}
// contracts build line pricing
export interface Contract {
    bounds?: GeoBounds,
    npi?: string,
    price: PricingFn
}
type PricingFn = (claim: Claim) => PricedClaim
export function pricing(): PricingFn{
    return (claim: Claim): PricedClaim => {
        return {}
    }
}

// a shopping cart of services needs to turn into multiple eob's; one for each
// provider
// this leads to an odd state where a different ordering leads to different
// eobs.
export class Eob {
    constructor(
        public subscriber: SubscriberState,
        public covered: Covered,
        public plan: PlanRules,
        public lines: EobLine[]) {
        // we should add up counters here
    }

    // these must be the sum of the lines; should we pass or recompute or 
    // some of each? we need claim adjustments, how does that work here?
    charge = 0
    allowed = 0
    paid = 0
    owe = 0
    copay = 0
    deduct = 0
    coins = 0
}

// generic <Covered>?
export interface SubscriberState {
    subscriber: string // name of subscriber
    plan: string  // name of the plan
    covered: Covered[] // each covered life
}
export interface Covered extends CounterMap {
    id: string
    name: string
}

// build a powerful toolkit for defining plans easily
export interface PlanRules {
    covered: CounterMap
    family: CounterMap
    style: PlanStyle
}
// we might need to redefine this per plan
export interface EobLine extends ShoppableLine {
    charge: number
    allowed: number
    paid: number
    owe: number
    copay: number
    deduct: number
    coins: number
}
export interface CounterMap {
    // these are the counters
    pocket: number
    deduct: number
}

export interface PrintEob {
    value: ValueMap
    line: ValueMap[]
}
export interface ValueMap {
    [key: string]: any
}
export interface PlanStyle {
    network: NamedKey[]
    counter: CounterKey[]
    claim: NamedKey[]
    line: NamedKey[]
}

export interface NamedKey {
    name: string
    key: string
}
export interface CounterKey {
    name: string
    key: string
    set: string
}

export interface CounterLine {
    name: string
    counter: number
    max: number
}

export interface EobFormat {
    claim: NamedKey[]
    counter: CounterKey[]
    line: NamedKey[]
}

export interface StoredData {
    // these don't have valid values if loggedIn=false
    state: SubscriberState
    plan: PlanRules
    patient: string
    recentProvider: string[]
}


export interface PricedClaim {
}


export interface GeoBounds {

}




// for hypotheticals, map the shoppable lines to different networks/npis
export async function adjudicate2(subscriber: SubscriberState,
    covered: Covered,
    plan: PlanRules,
    line: ShoppableLine[]): Promise<Eob> {

    // as we adudicate the claim we update the counters and summary
    var eob: EobLine[] = []
    for (let i of line) {
        i.code
        i.desc

        // set everything here, nothing comes into the cart
        var e: EobLine = {
            provider: i.provider,
            code: i.code,
            desc: i.desc,
            npi: i.npi,
            network: i.network,
            charge: 100,
            allowed: 80,
            paid: 80,
            owe: 0,
            copay: 0,
            deduct: 0,
            coins: 0,
        }
        eob.push(e)
    }
    //console.log(eob)
    return new Eob(
        subscriber, covered, plan, eob)
}
