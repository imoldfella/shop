import { VtabStore, Vtab, setVtabs, vtabs } from "../components/vtabs/vtab_store";
import { faker } from "@faker-js/faker"

// maybe there should one folder "sticky"?

// I need tab groups.
export function testVtabs() {
    if (vtabs?.root?.children.length) return;
    let r: Vtab[] = []
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