import { Icon } from "solid-heroicons"
import { chevronRight, sun, moon, cog_6Tooth as gear} from "solid-heroicons/solid"
import { createSignal, Show } from "solid-js";
import LanguageSelect from "../i18n";
import { dgos } from "../layout/store";

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
        dgos('dark',isDark())
     } }>

    <Show
    when={isDark()}
    fallback={<Icon path={moon} class="w-6 h-6"></Icon>}
    >
    <Icon path={sun} class="w-6 h-6"></Icon>
    </Show>
    </button>)
}

// language selector

export const SitePreference = () => {
    const [collapsed, setCollapsed] = createSignal(true);
  
    return (
      <div class="mt-2 border border-solid-lightitem bg-solid-light dark:bg-solid-dark dark:border-solid-darkitem rounded-lg">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-controls="preferences"
          type="button"
          class="flex items-center justify-between p-2 w-full cursor-pointer"
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
            
            <div class='flex'><div class='flex-1'><LanguageSelect/></div><div class='flex-none'><DarkButton/></div></div>
            <div class='flex'><div class='flex-1'></div></div>
          </div>
        </Show>
      </div>
    );
}