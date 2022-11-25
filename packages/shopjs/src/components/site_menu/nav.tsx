import { useLocation } from "@solidjs/router";
import { Collapsible, NavItem } from "./section";
import { For, Show } from "solid-js";
import { SECTIONS, SECTION_LEAF_PAGE, SECTION_PAGE } from "./site_store";


export function SectionsNavIterate(props: {
  pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
}) {
  const location = useLocation();

  // createEffect(() => {
  //   console.log(location.pathname);
  // });

  function isLeafPage(
    page: SECTION_PAGE | SECTION_LEAF_PAGE
  ): page is SECTION_LEAF_PAGE {
    return "link" in page;
  }

  //Wouldn't work if we actually went recursive (where the next level would have the possibility of not having any links)
  const isCollapsed = (pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>) => {
    return !pages.some((page) => {
      return isLeafPage(page) && location.pathname == page?.link;
    });
  };

  return (
    <For each={props.pages}>
      {(subsection: SECTION_LEAF_PAGE | SECTION_PAGE) => (
        <>
          <Show when={isLeafPage(subsection)}>
            <NavItem
              href={(subsection as SECTION_LEAF_PAGE).link}
              title={subsection.name}
            >
              {subsection.name}
            </NavItem>
          </Show>
          <Show when={(subsection as SECTION_PAGE).pages}>
            <ul>
              <Collapsible
                header={subsection.name}
                startCollapsed={isCollapsed((subsection as SECTION_PAGE).pages)}
              >
                <SectionsNavIterate
                  pages={(subsection as SECTION_PAGE).pages}
                />
              </Collapsible>
            </ul>
          </Show>
        </>
      )}
    </For>
  );
}

export function SectionNav(props: { sections: SECTIONS }) {
  const sectionNames = Object.keys(props.sections);

  return (
    <ul class="flex flex-col gap-4">
      <For each={sectionNames}>
        {(name, i) => (
          <>
            <li>
              <h2 class="pl-2 text-solid-dark dark:text-white font-bold text-xl">
                {props.sections[name].name}
              </h2>
              <SectionsNavIterate pages={props.sections[name].pages} />
            </li>
            <Show when={i() !== sectionNames.length - 1}>
              <li>
                <hr class="w-full mb-2" />
              </li>
            </Show>
          </>
        )}
      </For>
    </ul>
  );
}

