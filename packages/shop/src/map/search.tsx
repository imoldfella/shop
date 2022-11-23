
import { bars_3 , magnifyingGlass} from 'solid-heroicons/solid'
import { Icon } from 'solid-heroicons'

export function Search() {
    return <div class='fixed p-4 w-96 flex top-4 left-4 rounded bg-white text-black'>
        <Icon class='w-6 h-6' path={bars_3} />
        <input autofocus class='px-2 focus:outline-none flex-1' placeholder='Search for provider'>

        </input>
        <Icon class='w-6 h-6' path={magnifyingGlass} />
        </div>
    
}

// we need a drawer, we need a translucent closer.
export function Drawer() {


}