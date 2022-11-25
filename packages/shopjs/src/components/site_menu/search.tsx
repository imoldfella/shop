
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
export function SiteSearch() {
    return (
        <div class=' flex mt-2 mb-2 p-2 w-full text-white bg-solid-dark border-solid-darkitem border rounded-md'>
        <label class="relative block box-border">
        </label>
            <input autofocus
                class=" flex-1 bg-solid-dark focus:outline-none"
                placeholder="Search" type="search" />

        <Icon class="h-5 w-5 flex-none text-neutral-500" path={magnifyingGlass} />

          </div>

        )
}

/*
<form class="p-4 width">

        <label class="relative block box-border">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon path={magnifyingGlass} />
            </span>

            </label>
    </form>

/*
export default function SearchInput(props: {label: string, value: string, onInput(x:string) }) {
    return (
      <div class="relative flex-1">
        <label for="title" class="sr-only">
          {props.label}
        </label>
        <input
          class={`${
            props.small ? "px-4 py-2" : "p-4"
          } border border-solid-lightitem dark:border-solid-darkitem rounded-lg bg-transparent w-full flex-1`}
          id="title"
          value={props.value}
          onInput={props.onInput}
        />
        <div class="absolute right-0 top-0 bottom-0 grid place-content-center px-2">
          <Icon path={magnifyingGlass}  class="w-6 h-6 dark:text-solid-darkaction" />
        </div>
      </div>
    );
  }*/

/* Code tabs used like this. useful!

<CodeTabs
  js={[{ name: "Counter.jsx", component: Counter1 }]}
  ts={[{ name: "Counter.tsx", component: Counter1 }]}
/>
*/

/* from solid-next, not sure where AddBook is.

  */