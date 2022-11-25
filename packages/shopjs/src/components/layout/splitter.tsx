import { createSignal, JSX } from "solid-js";
import { GridResizer } from "../gridResizer";

export const clampPercentage = (percentage: number, lowerBound: number, upperBound: number) => {
    return Math.min(Math.max(percentage, lowerBound), upperBound);
}

export const Splitter = ({ children }: { children: JSX.Element[] }) => {
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
