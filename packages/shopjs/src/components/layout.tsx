
// we need to 

import { For } from "solid-js/web"
import { RailItem, store } from "./store"
import { GridResizer } from './gridResizer'
import { createSignal, Match, Switch } from "solid-js"
import { Icon } from "solid-heroicons"
import { bars_3, magnifyingGlass } from "solid-heroicons/solid";
import { Rail } from "./rail"
import { Vtabs } from "./vtabs"
import type { JSX, Component } from 'solid-js'


declare module "solid-js" {
    namespace JSX {
        interface Directives {  // use:model
            sortable: boolean
        }
    }
}

export const clampPercentage = (percentage: number, lowerBound: number, upperBound: number) => {
    return Math.min(Math.max(percentage, lowerBound), upperBound);
}

// the content can be a custom app url, or could be some standard app that this program already knows how to read. each concierge site has a menu that picks.

export const SiteMenu: Component<{}> = () => {
    return <div>
        Site menu
    </div>
}

export const Layout: Component<{}> = () => {

    return (<Splitter>
        <Vtabs />
        <Splitter>
            <SiteMenu />
            <Switch fallback={<iframe class=' w-full h-full' src='https://www.datagrove.com'></iframe>}>
                <Match when={store.app == "iframe"}>
                    <iframe class=' w-full h-full' src='https://www.datagrove.com'></iframe>
                </Match>
                <Match when={store.app == "map"}>
                    MAP!
                </Match>
            </Switch>
        </Splitter>
    </Splitter>)
}

export const Splitter = ({ children }: { children: JSX.Element[] }) => {
    let resizer!: HTMLDivElement
    let grid!: HTMLDivElement
    const [left, setLeft] = createSignal(.33);
    const changeLeft = (clientX: number, clientY: number) => {
        const rect = grid.getBoundingClientRect();
        let position = clientX - rect.left - resizer.offsetWidth / 2;
        let size = grid.offsetWidth - resizer.offsetWidth;
        const percentage = position / size;
        const percentageAdjusted = clampPercentage(percentage * 2, 0.5, 1.5);
        setLeft(percentageAdjusted);
    }

    return <div
        ref={grid}
        class="wrapper dark:bg-black grid h-full min-h-0 font-sans text-black dark:text-white"
        style={{
            '--left': `${left()}fr`,
            '--right': `${2 - left()}fr`,
        }}
    >
        <div class=' h-full w-full flex  bg-color-black'>
            {children[0]!}

        </div>
        <GridResizer ref={resizer} onResize={changeLeft} />
        {children[1]!}

    </div>
}

export const Aside = ({ children }: { children: JSX.Element[] }) => {
    return <aside class='w-full h-full flex-1 bg-slate-800'>
        <div class=' p-4 w-full flex top-4 left-4 rounded bg-white text-black'>
            <Icon class='w-6 h-6' path={bars_3} />
            <input autofocus class='px-2 focus:outline-none flex-1' placeholder='Search'>

            </input>
            <Icon class='w-6 h-6' path={magnifyingGlass} />
        </div>
    </aside>
}


