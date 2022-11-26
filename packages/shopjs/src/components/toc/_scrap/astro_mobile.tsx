
interface Heading { depth: number; slug: string; text: string }
function Foo() {
    return (<nav>
        <details class="toc-mobile-container"><summary class="toc-mobile-header"><div class="toc-mobile-header-content"><div class="toc-toggle"><h2 class="heading" id="on-this-page-heading">On this page</h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg></div><span class="toc-current-heading">The Component Script</span></div></summary><ul><li class="header-link depth-2"><a href="#overview">Overview</a></li><li class="header-link depth-2"><a href="#component-structure">Component Structure</a></li><li class="header-link depth-3 current-header-link"><a href="#the-component-script">The Component Script</a></li><li class="header-link depth-3"><a href="#the-component-template">The Component Template</a></li><li class="header-link depth-2"><a href="#jsx-like-expressions">JSX-like Expressions</a></li><li class="header-link depth-3"><a href="#variables">Variables</a></li><li class="header-link depth-3"><a href="#dynamic-attributes">Dynamic Attributes</a></li><li class="header-link depth-3"><a href="#dynamic-html">Dynamic HTML</a></li><li class="header-link depth-3"><a href="#dynamic-tags">Dynamic Tags</a></li><li class="header-link depth-3"><a href="#fragments--multiple-elements">Fragments &amp; Multiple Elements</a></li><li class="header-link depth-3"><a href="#differences-between-astro-and-jsx">Differences between Astro and JSX</a></li><li class="header-link depth-2"><a href="#component-props">Component Props</a></li><li class="header-link depth-2"><a href="#slots">Slots</a></li><li class="header-link depth-3"><a href="#named-slots">Named Slots</a></li><li class="header-link depth-3"><a href="#fallback-content-for-slots">Fallback Content for Slots</a></li><li class="header-link depth-2"><a href="#css-styles">CSS Styles</a></li><li class="header-link depth-2"><a href="#client-side-scripts">Client-Side Scripts</a></li><li class="header-link depth-2"><a href="#html-components">HTML Components</a></li><li class="header-link depth-2"><a href="#next-steps">Next Steps</a></li></ul></details>
    </nav>)
}
function Toc1() {
    const hd: Heading[] = [
        {
            depth: 1,
            slug: '#somewhere',
            text: 'look at me'
        }
    ]
    const [st, setSt] = createSignal("")
    testMarkdown().then((e) => setSt(e))
    return <article class='max-h-screen prose prose-neutral dark:prose-invert overflow-y-scroll' innerHTML={st()} />
}