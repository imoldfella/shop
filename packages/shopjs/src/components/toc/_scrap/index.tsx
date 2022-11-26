// converted from astro

import { unescape } from 'html-escaper';
import { Component, createEffect, createSignal, JSX, ParentComponent } from 'solid-js';
import './theme.css'
import './TableOfContents.css';

interface Props {
    headings: { depth: number; slug: string; text: string }[];
    labels?: {
        onThisPage: string;
        overview: string;
    };
    isMobile?: boolean;
}

// allready called with headings? 
export const TableOfContents: Component<Props> = ({ headings, labels = {
    onThisPage: "On this page",
    overview: "Overview"
}, isMobile = true }) => {

    headings = [{ depth: 2, slug: 'overview', text: labels.overview }, ...headings].filter(
        ({ depth }) => depth > 1 && depth < 4
    );

    const [toc, setToc] = createSignal(null as HTMLUListElement | null);

    const [currentID, setCurrentID] = createSignal('overview');
    const [open, setOpen] = createSignal(!isMobile);
    const onThisPageID = 'on-this-page-heading';

    const Container = ({ children }: { children: JSX.Element }) => {
        return isMobile ? (
            <details open={open()} onToggle={(e) => setOpen(e.target as any["open"])} class="toc-mobile-container">
                {children}
            </details>
        ) : (
            children
        );
    };

    const HeadingContainer = ({ children }: { children: JSX.Element }) => {
        const currentHeading = headings.find(({ slug }) => slug === currentID());
        return isMobile ? (
            <summary class="toc-mobile-header">
                <div class="toc-mobile-header-content">
                    <div class="toc-toggle">
                        {children}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 1 16 16"
                            width="16"
                            height="16"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                            ></path>
                        </svg>
                    </div>
                    {!open && currentHeading?.slug !== 'overview' && (
                        <span class="toc-current-heading">{unescape(currentHeading?.text || '')}</span>
                    )}
                </div>
            </summary>
        ) : (
            children
        );
    };

    createEffect(() => {
        const setCurrent: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const { id } = entry.target;
                    if (id === onThisPageID) continue;
                    setCurrentID(entry.target.id);
                    break;
                }
            }
        };

        const observerOptions: IntersectionObserverInit = {
            // Negative top margin accounts for `scroll-margin`.
            // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
            rootMargin: '-100px 0% -66%',
            threshold: 1,
        };

        const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

        // Observe all the headings in the main page content.
        document.querySelectorAll('article :is(h1,h2,h3)').forEach((h) => headingsObserver.observe(h));

        // Stop observing when the component is unmounted.
        return () => headingsObserver.disconnect();
    });

    const onLinkClick = (e: any) => {
        if (!isMobile) return;
        setOpen(false);
        setCurrentID(e.target.getAttribute('href').replace('#', ''));
    };

    return (
        <Container>
            <HeadingContainer>
                <h2 class="heading" id={onThisPageID}>
                    {labels.onThisPage}
                </h2>
            </HeadingContainer>
            <ul ref={setToc}>
                {headings.map(({ depth, slug, text }) => (
                    <li
                        class={`header-link depth-${depth} ${currentID() === slug ? 'current-header-link' : ''
                            }`.trim()}
                    >
                        <a href={`#${slug}`} onClick={onLinkClick}>
                            {unescape(text)}
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

/*
<nav aria-label={t('rightSidebar.a11yTitle')}>
    {
        headings && (
            <TableOfContents
                //client:media="(min-width: 50em)"
                headings={headings}
                labels={{ onThisPage: t('rightSidebar.onThisPage'), overview: t('rightSidebar.overview') }}
                isMobile={false}
            />
        )
    }
</nav>
*/