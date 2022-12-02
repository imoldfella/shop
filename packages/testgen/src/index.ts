import fs from 'fs'

import { faker } from "@faker-js/faker"

// maybe there should one folder "sticky"?

// I need tab groups.
export function testVtabs() {
    let r: any[] = []
    for (let i = 0; i < 100; i++) {
        r.push({
            label: faker.internet.domainName(),
            icon: faker.image.avatar(),
            count: 2,
            children: []
        })
    }
    fs.writeFileSync("test.json", JSON.stringify(r))
}

testVtabs()