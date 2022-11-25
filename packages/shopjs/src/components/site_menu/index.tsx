import { Component, For, JSX } from "solid-js"
import { GuidesNav } from "./nav"
import { SitePreference } from "./preference"
import { SiteSearch } from "./search"
import { SiteTabs } from "./tabs"

// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenu: Component<{}> = () => {
    return (<div class='w-full h-screen overflow-hidden'>
        <div class='w-full h-full overflow-y-scroll'><SiteTabs />
            <SiteSearch />
            <SitePreference />
            <div class='mt-4'><GuidesNav /></div>
        </div></div>)
}