import { LayoutStore, RailItem, setLayout } from "./store";
import { faker } from "@faker-js/faker"
import { testVtabs } from "../vtabs/vtab_test";
import { testSite } from "../site_menu/test";

export function testLayout() {
    testVtabs()
    testSite("")
    setLayout({
        ...new LayoutStore(),
    }
    )
}