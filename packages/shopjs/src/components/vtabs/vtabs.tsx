import { Component, For, JSX, Show, splitProps } from "solid-js"
import Sortable from 'sortablejs'
import { chartBar, chevronLeft, ellipsisHorizontal, mapPin, xMark } from "solid-heroicons/solid"
import { Icon } from "solid-heroicons"
import { menuOpen, setMenuOpen, setVtabPin, vtabPin, vtabs } from "./vtab_store";


// this needs a hover flyout and a pin.
// we need to allow collapsing.
// this could probably have its own store, it's pretty independent.

// mobile will not call this 
// pin implies open
// unpin + open
// unpin + !open

// https://tabler-icons.io/
export const datagrove = { path: () => <><path d=" M138.210709,237.000061   C138.210724,262.469391 138.210724,287.438721 138.210724,312.553284   C149.541382,314.047089 160.538116,315.496857 171.933746,316.999237   C171.933746,260.814819 171.933746,204.721603 171.933746,148.229156   C182.028778,148.229156 191.746292,148.229156 201.888916,148.229156   C201.888916,206.171143 201.888916,264.254974 201.888916,322.904327   C213.322006,325.198700 224.462311,327.434296 235.993774,329.748413   C235.993774,251.438660 235.993774,173.640991 235.993774,95.503899   C246.012451,95.503899 255.735886,95.503899 265.940918,95.503899   C265.940918,174.790695 265.940918,254.026459 265.940918,333.808807   C277.286194,334.519806 288.193207,335.203369 299.784546,335.929840   C299.784546,267.872803 299.784546,200.047028 299.784546,132.026672   C310.069092,132.026672 319.684906,132.026672 329.880554,132.026672   C329.880554,199.746857 329.880554,267.471802 329.880554,335.679749   C341.399506,335.110626 352.317719,334.571228 363.675415,334.010071   C363.675415,282.034393 363.675415,230.441528 363.675415,178.506973   C373.852936,178.506973 383.576996,178.506973 393.754150,178.506973   C393.754150,229.009827 393.754150,279.427704 393.754150,330.795898   C404.230408,328.992157 414.206299,327.655273 423.999786,325.492371   C436.323547,322.770599 448.472534,319.264160 460.764984,316.386871   C462.583466,315.961243 466.055328,316.557831 466.555573,317.672150   C468.069763,321.044861 464.815582,321.613464 462.464417,322.348877   C420.963776,335.329651 378.984619,346.197815 335.597046,350.716858   C302.493195,354.164856 269.701538,351.457581 237.316010,344.441711   C205.653564,337.582489 174.188553,329.815979 142.606262,322.581421   C120.585739,317.537109 98.351860,314.777618 76.912613,324.216797   C65.600609,329.197235 55.195591,336.242615 44.407990,342.402771   C43.116295,343.140442 42.105011,344.628540 40.765125,344.955933   C39.134708,345.354370 37.293789,344.891296 35.543930,344.800903   C36.060692,343.264282 36.107090,341.167908 37.166801,340.277435   C48.067936,331.117706 59.922939,323.291351 73.569672,319.050171   C84.608452,315.619568 96.042664,313.461334 108.034210,310.561493   C108.034210,248.051514 108.034210,184.316742 108.034210,120.206184   C118.211281,120.206184 127.922165,120.206184 138.210693,120.206184   C138.210693,158.964981 138.210693,197.732513 138.210709,237.000061  z" /></>, outline: false, mini: false };

interface Props2 extends JSX.SvgSVGAttributes<SVGSVGElement> {
    path: {
        path: JSX.Element;
        outline?: boolean;
        mini?: boolean;
    };
}
export const Icon2: Component<Props2> = (props) => {
    const [internal, external] = splitProps(props, ["path"]);

    return (
        <svg
            viewBox="0 0 492 492"
            fill={internal.path.outline ? "none" : "currentColor"}
            stroke={internal.path.outline ? "currentColor" : "none"}
            stroke-width={internal.path.outline ? 1.5 : undefined}
            {...external}
        >
            {internal.path.path}
        </svg>
    );
};
// the rail is the .sticky folder in the root.
export const Vtabs = () => {
    const shrink = () => {
        setVtabPin(!vtabPin())
    }
    const sitemap = () => {
        setMenuOpen(!menuOpen())
    }
    return (<div class=" cursor-pointer bg-white dark:bg-black overflow-hidden" classList={{
        "w-16  hover:w-64 group": !vtabPin(),
        "w-full": vtabPin()
    }}>
        <div class=' items-center relative flex top-0 w-full left-0'>
            <Icon2 path={datagrove} class='w-12 h-12 flex-none text-blue-700 hover:text-blue-500 m-2' onclick={sitemap} />
            <div class='flex-1'> </div>
            <Show when={vtabPin()} >
                <Icon class='flex-none w-5 h-5 mr-2' path={chevronLeft}
                    onclick={shrink} /></Show>
            <Show when={!vtabPin()} >
                <Icon class='text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 flex-none w-5 h-5 mr-4' path={mapPin}
                    onclick={shrink} /></Show>
        </div>
        <nav
            class='  h-full w-full li-none flex-row overflow-y-auto'
            ref={el => new Sortable(el, {
                animation: 150,
                ghostClass: 'bg-neutral-500'
            })} >


            <For each={vtabs.root!.children}>{(e) =>
                <div class='w-full  overflow-hidden  flex items-center'><img class="flex-none rounded-md h-12 w-12 shadow m-2" src={e.icon} />

                    < div class=' flex-1 cursor-pointer' > {e.label}</div >
                    <Icon class='flex-none h-5 w-5 m-2 text-blue-700 hover:text-blue-500' path={ellipsisHorizontal} />
                </div >
            }</For ></nav ></div >)

}

/*
import { For } from "solid-js"

import Sortable from 'sortablejs'

let rail = railItems()
// the rail is the .sticky folder in the root.
export const Rail = () => {
   return  (<nav ref={el=>new Sortable(el,{
        animation: 150,
        ghostClass: 'bg-slate-500'
    })} class='bg-gray-900   w-16 flex-none li-none flex-row'>
   
        <For each={rail}>{(e) =><div class=''><img class=" rounded-full h-12 w-12 shadow m-2" src={e.icon} /></div>
            
        }</For></nav>)

}*/