import { JSX, Component } from 'solid-js';
declare type SolidRef = (el: HTMLDivElement) => void;
export declare const GridResizer: Component<{
    ref: HTMLDivElement | SolidRef;
    onResize: (clientX: number, clientY: number) => void;
    size: () => number;
}>;
export declare const Splitter: ({ children, left, setLeft }: {
    children: JSX.Element[];
    left: () => number;
    setLeft: (n: number) => void;
}) => JSX.Element;
export {};
