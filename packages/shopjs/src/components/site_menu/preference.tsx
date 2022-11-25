import { Icon } from "solid-heroicons"
import { chevronRight, sun, moon, cog_6Tooth as gear} from "solid-heroicons/solid"
import { createSignal, Show } from "solid-js";

const [isDark, setIsDark] = createSignal(true)

export const DarkButton = ()=> {
    return (<button
    type="button"
    aria-label={`Use ${isDark() ? "light" : "dark"} mode`}
    onClick={() => {
        const html = document.querySelector("html")!
        setIsDark(!isDark())
        isDark()
        ? html.classList.add("dark")
        : html.classList.remove("dark");

     } }>

    <Show
    when={isDark()}
    fallback={<Icon path={moon} class="w-6 h-6"></Icon>}
    >
    <Icon path={sun} class="w-6 h-6"></Icon>
    </Show>
    </button>)
}

export const SitePreference = () => {
    const [collapsed, setCollapsed] = createSignal(false);
  
    return (
      <div class="border border-solid-lightitem bg-solid-light dark:bg-solid-dark dark:border-solid-darkitem rounded-lg">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-controls="preferences"
          type="button"
          class="flex items-center justify-between p-4 w-full cursor-pointer"
        >
          <div class="flex items-center gap-2 font-semibold">
            <div class="bg-solid-lightitem dark:bg-solid-darkitem rounded-lg p-1">
              <Icon path={gear} class="w-4 h-4" />
            </div>
            Preferences
          </div>
          <Icon path={chevronRight}
            class={`w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform transition ${
              !collapsed() ? "rotate-90" : ""
            }`}
          />
        </button>
        <Show when={!collapsed()}>
          <div aria-label="preferences" class="p-4 border-t border-solid-lightitem dark:border-solid-darkitem">
            <DarkButton></DarkButton>
          </div>
        </Show>
      </div>
    );
}