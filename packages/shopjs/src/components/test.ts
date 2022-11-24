import { RailData, RailItem, setStore } from "./store";
import {faker} from "@faker-js/faker"

// maybe there should one folder "sticky"?


const testRail : RailData = {
    folder: {
        label: "root",
        iframe: "",
        app: [

        ],
        folder: [
    
        ],
        count: 3
    },
    recentSearch: [

    ],
    // we need the scroll state of search and folders
    crumb: []
}

export function beginTest() {
    setStore(testRail)
}


export function railItems() : RailItem[] {
    return [1,2,3].map((e) => {
        return {
            label: faker.internet.domainName(),
            icon: faker.image.avatar(),
            count: 2,
            iframe: 'espn.com'
        }
    })
}