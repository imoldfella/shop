import { useLocation } from "@solidjs/router";
import { Collapsible, NavItem } from "./section";
import { For, Show } from "solid-js";
import { Page, PageDescription } from "./site_store";

// recursively build the sidbar menu
export function SectionsNavIterate(props: {
  pages: Array<Page>;
}) {
  const location = useLocation();
  function isLeafPage( page: Page ): boolean{
    return page.children==null
  }

  // pure accordian style collapses everything not a parent of the url
  // it might be friendlier to allow things to be left open
  const isCollapsed = (pages: Page) => {
    // return !pages.some((page) => {
    //   return isLeafPage(page) && location.pathname == page?.link;
    // });
    return false
  };

  return (
    <For each={props.pages}>
      {(subsection: Page) => (
        <>
          <Show when={isLeafPage(subsection)}>
            <NavItem
              href={subsection.path??""}
              title={subsection.name}
            >
              {subsection.name}
            </NavItem>
          </Show>
          <Show when={subsection.children}>
            <ul>
              <Collapsible
                header={subsection.name}
                startCollapsed={isCollapsed(subsection)}
              >
                <SectionsNavIterate
                  pages={subsection.children??[]}
                />
              </Collapsible>
            </ul>
          </Show>
        </>
      )}
    </For>
  );
}


export function SectionNav(props: {page: PageDescription }) {
  // this needs be recursive, starting from the 
  return (
    <ul class="flex flex-col gap-4">
      <For each={props.page.root.children??[]}>
        {(page, i) => (
          <>
            <li>
              <h2 class="pl-2 text-solid-dark dark:text-white font-bold text-xl">
                {page.name}
              </h2>
              <SectionsNavIterate pages={page.children??[]} />
            </li>
          </>
        )}
      </For>
    </ul>
  );
}

/*
            <Show when={i() !== page>
              <li>
                <hr class="w-full mb-2" />
              </li>
            </Show>
*/