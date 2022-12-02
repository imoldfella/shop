import { Icon } from "solid-heroicons"
import { xCircle } from "solid-heroicons/outline"
import { Component, For, JSX } from "solid-js"
import { CloseButton } from "../core/buttons"
import { SectionNav } from "./nav"
import { SitePreference } from "./preference"
import { site } from "./site_store"
import { SiteTabs } from "./tabs"

// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenuContent: Component<{}> = () => {
  return (<div class='pb-16'>
    <div class='mt-2 font-semibold text-lg'>{site.title()}</div>
    <div class='flex items-center'>
      <div class='flex-1 '><SiteTabs /></div>
    </div>
    <SitePreference />
    <div class='mt-4'>
      <SectionNav sections={site.section[0]} />
    </div></div>)
}

/*

// close button
            <Icon path={xCircle} class='flex-none m-4  h-6 w-6 text-blue-700 hover:text-blue-500' onclick={ ()=>setSitemap(ShowSitemap.none) }/>


export function ReferenceNav() {
  return <SectionNav sections={REFERENCE_SECTIONS} />;
}

export function GuidesNav() {
  return <SectionNav sections={GUIDES_SECTIONS} />;
}

*/