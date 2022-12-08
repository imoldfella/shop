import { ParentProps, JSX } from "solid-js";
export declare function CollapsedIcon(props: {
    class: string;
}): JSX.Element;
declare type CollapsibleProps = ParentProps<{
    startCollapsed?: boolean;
    header: string;
}>;
export declare function Collapsible(props: CollapsibleProps): JSX.Element;
export declare function SectionHeader(props: ParentProps<{
    collapsed: boolean;
    panelId: string;
    onClick: () => void;
}>): JSX.Element;
export declare function NavItem(props: {
    children: JSX.Element;
    href: string;
    title: string;
}): JSX.Element;
export {};
