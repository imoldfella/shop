
import * as eo from '../lib/eob'

// todo: potentially a login could be associated with more than one plan.
export async function testData(): Promise<eo.StoredData> {
    var plan = await (await fetch('/assets/plan.json')).json();
    var state = await (await fetch('/assets/lear.json')).json();
    return {
        recentProvider: [],
        plan: plan,  // static information about the plan referenced by the plan state
        state: state, // information return from the func
        patient: "1",
    }
}
const contract1: eo.Contract = {
    npi: "npi_contract1.csv",
    price: (claim: eo.Claim) => {
        return {}
    }
}
const contract2: eo.Contract = {
    price: eo.pricing() // "price1.csv"
}

const planx: eo.PlanFn = eo.plan()





const drs = [
    {
        name: 'jill md', address: 'somewhere', cszip: 'Chicago, IL 19063',
        charge: '203.40', npi: '1234567890', distance: '5'
    },
    {
        name: 'joe md', address: 'somewhere', cszip: 'Chicago, IL 19063',
        charge: '203.40', npi: '1234567891', distance: '5'
    }
]

