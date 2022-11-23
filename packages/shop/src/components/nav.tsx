import { Icon } from "solid-heroicons";
import { chartBar, chevronLeft, magnifyingGlass, printer, xMark } from "solid-heroicons/solid";
import { JSX, Show } from 'solid-js'
import { Aicon, CartButtonCounted } from "./AddToCart";

// toolbar with close
export function ModalNav(props: { title: string, setClose: () => void }) {
    return (<nav class="navbar" role="navigation" aria-label="main navigation">
        <button class="navbar-tool" onClick={props.setClose}>
            <Icon path={xMark} />
        </button>
        <div class="text-sm align-middle flex flex-col justify-center">
            {props.title}
        </div>
    </nav>)
}

export function Nav(props: { back: boolean, cart: boolean }) {
    return (<nav class="navbar" role="navigation" aria-label="main navigation">
        <div class='navbar-left'>
            {props.back && <button onclick={() => history.back()} >
                <Icon class="h-6 w-6 text-blue-600 hover:text-blue-400 mx-2" path={chevronLeft} /></button>
            }
            {!props.back && <a href='https://datagrove.com' class="" aria-label="logo" >
                <Icon path={chartBar} class='h-6 w-6 text-blue-600 hover:text-blue-400 mx-2' />
            </a>
            }
        </div>
        <div class="navbar-brand">
            <a class="navbar-item" href="/index.html">
                💪 Iron Shop
            </a>
        </div>
        <div class="navbar-right">
            <Show when={props.cart}>
                <Aicon href='/cart' path={printer} />
            </Show>
            <Show when={!props.cart}>
                <Aicon href='/search' path={magnifyingGlass} />
                <CartButtonCounted />
            </Show>
        </div>

    </nav>)
}

// search as nav
export function searchInput() {
    return (<form class="p-4 width">

        <label class="relative block box-border">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon path={magnifyingGlass} />
            </span>
            <input autofocus
                class="w-full text-black bg-white placeholder:font-italitc border border-slate-300 rounded-half py-2 pl-10 pr-4  focus:outline-none"
                placeholder="Example: Family Nurse near Sheboygan" type="search" />
        </label>
    </form>)
}