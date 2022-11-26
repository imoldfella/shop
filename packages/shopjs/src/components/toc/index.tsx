import { Icon } from "solid-heroicons"
import { chevronRight } from "solid-heroicons/solid"
import { createEffect, createSignal, For, Show } from "solid-js"
import { testMarkdown } from "../content"
import { usePageState } from "../content/prevnext"
import './toc2.css'

// https://codepen.io/lisilinhart/pen/NWrrNpV
interface Head {
    title: string
    depth: number
    id: string
}
export function generateLinkMarkup($headings: HTMLElement[]) {
    const parsedHeadings = $headings.map(heading => {
        return {
            title: heading.innerText,
            depth: parseInt(heading.nodeName.replace(/\D/g, '')),
            id: heading.getAttribute('id')
        }
    })
    // use jsx here for better typing?
    const htmlMarkup = parsedHeadings.map(h => `
      <li class="dark:hover:text-white hover:underline header-link ${h.depth > 1 ? 'pl-4' : 'pl-2'}">
          <a class="" href="#${h.id}">${h.title}</a>
      </li>
      `)
    const finalMarkup = `
          <ul class=' leading-6'>${htmlMarkup.join('')}</ul>
      `
    return finalMarkup
}

function updateLinks(visibleId: string, $links: HTMLElement[]) {
    $links.map(link => {
        let href = link.getAttribute('href')
        link.classList.remove('is-active')
        if (href === visibleId) link.classList.add('is-active')
    })
}

function handleObserver(entries: any[], observer: any, $links: HTMLElement[]) {
    entries.forEach((entry: any) => {
        const { target, isIntersecting, intersectionRatio } = entry
        if (isIntersecting && intersectionRatio >= 1) {
            const visibleId = `#${target.getAttribute('id')}`
            updateLinks(visibleId, $links)
        }
    })
}

function createObserver($links: HTMLElement[]) {
    const options = {
        rootMargin: "0px 0px -200px 0px",
        threshold: 1
    }
    const callback: IntersectionObserverCallback = (e, o: IntersectionObserverInit) => handleObserver(e, o, $links)
    return new IntersectionObserver(callback, options)
}

export function buildToc(contentDiv: HTMLElement, $aside: HTMLElement) {
    const $headings: Element[] = [...contentDiv.querySelectorAll('h1, h2')];
    const linkHtml = generateLinkMarkup($headings as HTMLElement[]);
    $aside.innerHTML = linkHtml

    const $links = [...$aside.querySelectorAll('a')]
    const observer = createObserver($links)
    $headings.map(heading => observer.observe(heading))
}

// Summary can be at the top of the page, collapsed, or at the side if screen is wide enough
export  function Summary(props: {collapsed?: boolean}) {
    const { sections } = usePageState()!;
    const [collapsed, setCollapsed] = createSignal(props.collapsed || false);

    return (
        <div class="py-2 px-4 border border-solidlightitem rounded-md md:(p-4 border-none bg-transparent) bg-solid-light z-50 dark:(bg-solid-dark md:bg-transparent border-solid-darkitem)">
            <button
                onClick={() => setCollapsed((prev) => !prev)}
                aria-controls="preferences"
                type="button"
                class="w-full md:text-2xl font-bold flex items-center justify-between md:pointer-events-none"
            >
                Summary
                <Icon path={chevronRight}
                    class={`md:hidden w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform transition ${
                    !collapsed() ? "rotate-90" : ""
                    }`}
                />
            </button>
            <Show when={!collapsed()}>
                <ol class="mt-2 list-none space-y-1">
                <For each={sections()}>
                    {(item, index) => (
                    <li class="text-base py-2 flex items-center gap-2 rounded hover:bg-solid-light hover:dark:bg-solid-darkbg px-2">
                        
                        <a class="font-semibold" href={"#" + item.href}>
                        {item.title}
                        </a>
                    </li>
                    )}
                </For>
                </ol>
            </Show>
        </div>
    )
}


// not really just the toc, this renders the markdown with a toc
// builds the toc from the html generated.
export function Toc() {
    const [aside, setAside] = createSignal(null as HTMLElement | null)
    const [content, setContent] = createSignal(null as HTMLElement | null)

    createEffect(() => {
        
        testMarkdown().then((e) => {
            console.log("wtf", content(), aside(), e)
            content()!.innerHTML = e
            buildToc(content()!, aside()!)
        })
    })

    // toc main sets up the grid
    return (<main class="tocmain">
        <article>
        <Summary/>
        <div class='pb-8 max-h-screen prose prose-neutral dark:prose-invert overflow-y-scroll' ref={setContent} />
        </article>
       
        <aside class="not-prose sticky text-sm top-0 ml-8 pt-16 dark:text-neutral-400">
        <p class='text-white mb-2 pl-2'>On this page</p>
        <div id="aside" class=" " ref={setAside} />
        </aside>
    </main>)
}
