import { createEffect, createSignal } from "solid-js"
import { testMarkdown } from "../content"
import './toc2.css'
// https://codepen.io/lisilinhart/pen/NWrrNpV
interface Head {
    title: string
    depth: number
    id: string
}
export function generateLinkMarkup($headings: HTMLElement[]) {
    console.log($headings)
    const parsedHeadings = $headings.map(heading => {
        return {
            title: heading.innerText,
            depth: parseInt(heading.nodeName.replace(/\D/g, '')),
            id: heading.getAttribute('id')
        }
    })
    const htmlMarkup = parsedHeadings.map(h => `
      <li class="${h.depth > 1 ? 'pl-4' : ''}">
          <a href="#${h.id}">${h.title}</a>
      </li>
      `)
    const finalMarkup = `
          <ul class='text-xl leading-10'>${htmlMarkup.join('')}</ul>
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
    return (<main class="tocmain">
        <article class='max-h-screen prose prose-neutral dark:prose-invert overflow-y-scroll' ref={setContent} >
            werqer
        </article>
        <aside id="aside" class="sticky top-0 ml-8 pt-16" ref={setAside} />
    </main>)
}

/*
html {
    height: 100%;
}


body {
    display: flex;
    flex-direction: column;
    margin: auto;
    background-color: white;
    font-family: 'Cabin', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: #333;
    font-size: 20px;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .05;
    z-index: -1;
    background: url("https://static.thenounproject.com/png/2590971-200.png");
    background-size: 200px 200px;
    background-repeat: repeat;
    background-position: center center;
}



h1,
h2,
h3,
h4,
h5 {
    font-family: 'Oswald', sans-serif;
    margin: 2.75rem 0 1.05rem;
    font-weight: 400;
    line-height: 1.15;
}

h1 {
    font-size: 3.052em;
}

h2 {
    font-size: 2.441em;
}

h3 {
    font-size: 1.953em;
}

h4 {
    font-size: 1.563em;
}

h5 {
    font-size: 1.25em;
}

.wrapper {
    margin: 0 auto;
    display: grid;
    padding: 10px;
    grid-template-columns: 300px auto;
    grid-gap: 30px;
    align-items: flex-start;
}
*/
