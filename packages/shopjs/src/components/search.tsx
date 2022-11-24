
import { Icon } from "solid-heroicons";
import { chartBar, chevronLeft, magnifyingGlass, printer, xMark } from "solid-heroicons/solid";
import { JSX, Show } from 'solid-js'

// https://romansorin.com/blog/disabling-the-tailwind-input-ring

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