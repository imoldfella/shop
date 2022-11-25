import { VtabStore, Vtab, setVtabs } from "./vtab_store";
import { faker } from "@faker-js/faker"

// maybe there should one folder "sticky"?


export function testVtabs() {
    let r :Vtab[] = []
    for (let i = 0; i < 100; i++) {
        r.push({
            label: faker.internet.domainName(),
            icon: faker.image.avatar(),
            count: 2,
            children: []
        })
    }
    setVtabs({
        ...new VtabStore(),
        root: {
            children: r
        }
    })
}