import { LayoutStore, RailItem, setLayout } from "../components/layout/store";
import { faker } from "@faker-js/faker"
import { testVtabs } from "./vtab_test";
import { testSite } from "./testMenu";

export function testLayout() {
    testVtabs()
    testSite("")
    setLayout({
        ...new LayoutStore(),
    }
    )
}