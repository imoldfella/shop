import { Component, For, JSX } from "solid-js"
import { SectionNav } from "./nav"
import { SitePreference } from "./preference"
import { SiteSearch } from "./search"
import { site } from "./site_store"
import { SiteTabs } from "./tabs"

// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenu: Component<{}> = () => {
    return (<div class='w-full h-screen overflow-hidden'>
        <div class='w-full h-full overflow-y-scroll'><SiteTabs />
        
            <SitePreference />
            <div class='mt-4'>
                <SectionNav sections={ site.section[0] }/>
            </div>
        </div></div>)
}

/*
export function ReferenceNav() {
  return <SectionNav sections={REFERENCE_SECTIONS} />;
}

export function GuidesNav() {
  return <SectionNav sections={GUIDES_SECTIONS} />;
}

*/