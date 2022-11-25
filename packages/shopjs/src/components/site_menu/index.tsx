import { Component, For, JSX } from "solid-js"
import { GuidesNav } from "./nav"
import { SitePreference } from "./preference"
import { SiteSearch } from "./search"
import { SiteTabs } from "./tabs"
/*
    we should have some site branding, brand color etc.

    tabs (can scroll off)
    search 
    preferences
    sections for tab.

*/




export const SiteSection = (props: {children: JSX.Element})=>{
    return (<div></div>)
}

// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenu: Component<{}> = () => {
    return (<div>
       
        <SiteTabs/>
        <SiteSearch/>
        <SitePreference/>
        <div class='mt-4'><GuidesNav/></div>
    </div>)
}