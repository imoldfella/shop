
import type { AdjudicationInput } from './config'
import { createSignal, JSX, Show } from 'solid-js'

export const drsearchScreen = 1
export const cartScreen = 0
export const mapScreen = 2

class UiState {
    login = false
    screen = cartScreen
}
export const [getUi, setUi] = createSignal(new UiState)

export function login(x: boolean) {
    setUi({
        ...getUi(),
        login: x
    })
}

export function setScreen(screen: number) {
    setUi({
        ...getUi(),
        screen: screen
    })
}


const claimCart: AdjudicationInput | undefined = undefined

export const [getCart, setCart] = createSignal(claimCart);

export function clear() {

}



/*
function showDebug() {
    const store = useStore()
    return (<pre>
        login: { store.isLogin() }
        empty: { store.isEmpty() }
        { JSON.stringify(store, null, '\t') }
    </pre>)
}
*/




/*
                        <table>
            <!-- pre-adudication lines, -->
            <tr v-htmlFor="(item, index) in store.lines || []">
                <td> <!-- search for a doctor -->
                    <button class="px-4" onClick="drsearch(index)"><svg
                        xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg></button></td>

                <td>
                    { item.code } { item.desc }
                </td>
            </tr>
        </table>
        */


/*
function Cart2() {

    const pickList = "mt-1 mb-2 block  pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"

    // const store = useStore()
    // const step = ref(0)
    // const debug = ref(true)
    // const token = ref("")
    // const mobile = ref("")
    // const screen = ref(0)
    // //const zip = ref("12345")
    // const searchDesc = ref("")



    function cancelSearch() {
        screen.value = cartScreen
    }
    function showMap() {
// the patient's zip coce
const lat = store.location.coords.latitude
    const lng = store.location.coords.longitude
//store.getProviders(zip.value, ln.code)
// searchDesc.value = `${ln.code} ${ln.desc} near ${lat},${lng}`
//${zip.value}

    screen.value = mapScreen
}
    async function drsearch(i: number)  {
// the patient's zip coce
var ln = store.lines[i];
    const lat = store.location.coords.latitude
    const lng = store.location.coords.longitude
    store.getProviders(searchDesc.value, ln.code)
    let query = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    console.log('query ',query)
    let o = await (await fetch(query)).json()
    console.log('result ', o)
    searchDesc.value = `${ln.code} ${ln.desc} near ${o.address.town}`
//${zip.value}

    screen.value = drsearchScreen
}
    function login() {
        store.login(token.value)
    }
    function submit() {
        store.fetchCode(mobile.value);
    return false
}
    function goBack() {
        history.back()
    }

    function addProvider() {
        // this is probably a route, or maybe a popup?

    }
    function pickProvider(npi: string) {
        cancelSearch()
    }
    store.init()
    console.log("login", store.isLogin())
}


function CancelSvg() {
    return (<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="#808080" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>)
}

function Magnifier() {
    return (<svg class="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
        height="30" viewBox="0 0 30 30">
        <path
            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
        </path>
    </svg>)
}

function PrinterSvg() {
    return (<svg xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#808080" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>)
}

*/
