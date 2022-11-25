import { Store, RailItem, setStore } from "./store";
import { faker } from "@faker-js/faker"

// maybe there should one folder "sticky"?


const testRail: Store = {
    ...new Store(),
    app: "map",
    folder: {
        label: "root",
        iframe: "",
        app: [

        ],
        folder: [

        ],
        count: 3
    },
}

export function beginTest() {
    setStore(testRail)
}


export function railItems(): RailItem[] {
    let r = []
    for (let i = 0; i < 100; i++) {
        r.push({
            label: faker.internet.domainName(),
            icon: faker.image.avatar(),
            count: 2,
            iframe: 'espn.com'
        })
    }
    return r
}