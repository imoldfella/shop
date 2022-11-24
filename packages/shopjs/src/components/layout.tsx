
// we need to 

import { For } from "solid-js/web";
import { RailItem } from "./store";
import { GridResizer } from './gridResizer';
import { createSignal } from "solid-js";
import { Icon } from "solid-heroicons";
import { bars_3, magnifyingGlass } from "solid-heroicons/solid";
import { Rail } from "./rail";

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

export const Layout = () => {
    let resizer!: HTMLDivElement
    let grid!: HTMLDivElement
    const [left, setLeft] = createSignal(1.25);
     const changeLeft = (clientX: number, clientY: number) => {
        const rect = grid.getBoundingClientRect();
        let position = clientX - rect.left - resizer.offsetWidth / 2;
        let size = grid.offsetWidth - resizer.offsetWidth;
        const percentage = position / size;
        const percentageAdjusted = clampPercentage(percentage * 2, 0.5, 1.5);
        setLeft(percentageAdjusted);
    };

    return <div
        ref={grid}
        class="wrapper dark:bg-black grid h-full min-h-0 font-sans text-black dark:text-white"
        style={{

            '--left': `${left()}fr`,
            '--right': `${2 - left()}fr`,
        }}
    >
        <div class=' h-full w-full flex  bg-color-black'>
        <Rail />
        <aside class='w-full h-full flex-1 bg-slate-800'>
            <div class=' p-4 w-full flex top-4 left-4 rounded bg-white text-black'>
                <Icon class='w-6 h-6' path={bars_3} />
                <input autofocus class='px-2 focus:outline-none flex-1' placeholder='Search'>

                </input>
                <Icon class='w-6 h-6' path={magnifyingGlass} />
            </div>
        </aside>
    </div>
        <GridResizer ref={resizer}  onResize={changeLeft} />
        <iframe class='hidden w-full h-full' src='https://www.datagrove.com'></iframe>

    </div>
}



