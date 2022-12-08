import { Component, JSX } from "solid-js";
interface Props2 extends JSX.SvgSVGAttributes<SVGSVGElement> {
    path: {
        path: JSX.Element;
        outline?: boolean;
        mini?: boolean;
    };
}
export declare const Icon2: Component<Props2>;
export {};
