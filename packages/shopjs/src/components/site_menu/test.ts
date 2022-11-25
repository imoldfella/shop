import { setSite, SiteStore, SiteLink, SECTIONS } from "./site_store";

// https://diataxis.fr/


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
  


// this needs to be set from the tab? should we use location instead?
export function testSite(site: string ){
    setSite({
        ...new SiteStore(),
        root: {
            ...new SiteLink(),
            children: [
                {
                    ...new SiteLink(),
                    title: "Guides",
                    href: "guides"
                },
                {
                    ...new SiteLink(),
                    title: "Reference",
                    href: "reference"
                },
            ]
        },
        selected: 0,
        section: [
            GUIDES_SECTIONS,
            REFERENCE_SECTIONS
        ],
        language: {
            en: 'English',
            de: 'Deutsch',
            'pt-br': 'Português do Brasil',
            es: 'Español',
            'zh-cn': '简体中文',
            'zh-tw': '正體中文',
            fr: 'Français',
            ar: 'العربية',
            ja: '日本語',
            ru: 'Русский',
        }
        
    })
}