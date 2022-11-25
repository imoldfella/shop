import { NavLink, Route, Routes, useLocation } from "@solidjs/router";

import { Collapsible, NavItem } from "./section";
import { createEffect, createSignal, For, Show } from "solid-js";
// import {
//   GUIDES_SECTIONS,
//   REFERENCE_SECTIONS,
//   SECTIONS,
//   SECTION_LEAF_PAGE,
//   SECTION_PAGE,
// } from "~/NAV_SECTIONS";

export type SECTION_LEAF_PAGE = {
    name: string;
    link: string;
  };
  
  export type SECTION_PAGE = {
    name: string;
    pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
  };
  
  export type SECTIONS = {
    [key: string]: {
      name: string;
      // If this exists, then when the user clicks on the name of the section, it will direct here
      link?: string;
      pages: Array<SECTION_PAGE | SECTION_LEAF_PAGE>;
    };
  };
  
  export const REFERENCE_SECTIONS: SECTIONS = {
    concepts: {
      name: "Concepts",
      pages: [
        {
          name: "Reactivity",
          pages: [
            {
              name: "Reactivity Basics",
              link: "/references/concepts/reactivity",
            },
            { name: "Tracking", link: "/references/concepts/tracking" },
          ],
        },
      ],
    },
    api: {
      name: "API",
      pages: [
        {
          name: "API Reference",
          pages: [{ name: "Coming Soon", link: "/references/api-reference" }],
        },
      ],
    },
  };
  
  export const GUIDES_SECTIONS: SECTIONS = {
    tutorials: {
      name: "Tutorials",
      pages: [
        {
          name: "Getting Started with Solid",
          // navigating to /guides/getting-started-with-solid takes you to /guides/getting-started-with-solid/welcome
          pages: [
            {
              name: "Welcome",
              link: "/guides/tutorials/getting-started-with-solid/welcome",
            },
            {
              name: "Installing Solid",
              link: "/guides/tutorials/getting-started-with-solid/installing-solid",
            },
            {
              name: "Building UI with Components",
              link: "/guides/tutorials/getting-started-with-solid/building-ui-with-components",
            },
            {
              name: "Adding Interactivity with State",
              link: "/guides/tutorials/getting-started-with-solid/adding-interactivity-with-state",
            },
            {
              name: "Control Flow",
              link: "/guides/tutorials/getting-started-with-solid/control-flow",
            },
            {
              name: "Fetching Data",
              link: "/guides/tutorials/getting-started-with-solid/fetching-data",
            },
          ],
        },
      ],
    },
    foundations: {
      name: "Foundations",
      pages: [
        {
          name: "Why Solid?",
          link: "/guides/foundations/why-solid",
        },
        {
          name: "Thinking Solid",
          link: "/guides/foundations/thinking-solid",
        },
        {
          name: "JavaScript for Solid",
          link: "/guides/foundations/javascript-for-solid",
        },
            {
              name: "Typescript for Solid",
              link: "/guides/foundations/typescript-for-solid"
            },
      ],
    },
    "how-to-guides": {
      name: "How-To Guides",
      pages: [
        {
          name: "Get Ready for Solid",
          pages: [
            {
              name: "Welcome",
              link: "/guides/how-to-guides/get-ready-for-solid/",
            },
            {
              name: "Installation & Setup",
              link: "/guides/how-to-guides/get-ready-for-solid/installation-and-setup",
            },
            {
              name: "Linting",
              link: "/guides/how-to-guides/get-ready-for-solid/linting",
            },
          ],
        },
        {
          name: "Styling In Solid",
          pages: [
            {
              name: "Introduction",
              link: "/guides/how-to-guides/styling-in-solid",
            },
            {
              name: "CSS Modules",
              link: "/guides/how-to-guides/styling-in-solid/css-modules",
            },
            {
              name: "Sass",
              link: "/guides/how-to-guides/styling-in-solid/sass",
            },
            {
              name: "Less",
              link: "/guides/how-to-guides/styling-in-solid/less",
            },
            {
              name: "Tailwind CSS",
              link: "/guides/how-to-guides/styling-in-solid/tailwind-css",
            },
            {
              name: "UnoCSS",
              link: "/guides/how-to-guides/styling-in-solid/unocss",
            },
            {
              name: "WindiCSS",
              link: "/guides/how-to-guides/styling-in-solid/windicss",
            },
          ],
        },
        {
          name: "Comparison",
          pages: [
            {
              name: "Vue",
              link: "/guides/how-to-guides/comparison/vue",
            },
          ],
        },
      ],
    },
  };
  


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
  
  export function ReferenceNav() {
    return <SectionNav sections={REFERENCE_SECTIONS} />;
  }
  
  export function GuidesNav() {
    return <SectionNav sections={GUIDES_SECTIONS} />;
  }
  