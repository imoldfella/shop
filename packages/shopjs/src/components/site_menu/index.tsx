import { useLocation } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import { xCircle } from "solid-heroicons/outline"
import { Component, For, JSX } from "solid-js"
import { CloseButton } from "../core/buttons"
import { SectionNav } from "./nav"
import { SitePreference } from "./preference"
import { Page, site , PageDescription } from "./site_store"
import { SiteTabs } from "./tabs"

// everything can scroll off; maximum use of space. easy to find top anyway.
// we probably need a sticky to close? maybe this can be done with the rail though
export const SiteMenuContent: Component<{page: PageDescription}> = (props) => {

  // we need to build based on the route
  // should we be passing this as a prop from layout? is that more performant?


  return (<div class='pb-16'>
    <div class='mt-2 font-semibold text-lg'>
      <a href={site.href} target='_blank' class='text-blue-700 hover:text-blue-500 hover:underline'> {site.title()}
      </a></div>
    <div class='flex items-center'>
      <div class='flex-1 '><SiteTabs page={props.page}/></div>
    </div>
    <SitePreference />
    <div class='mt-4'>
    <SectionNav page={props.page} />
    </div>
    </div>)
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