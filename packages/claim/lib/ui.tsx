//import { useStore } from './cart'
import { ChevronLeftIcon, ShoppingCartIcon, PrinterIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Claim, Payor, AdjudicationInput } from './eob';
import { Map } from '@datagrove/map'
import React, { ReactNode as Children, createContext, useContext, useReducer } from 'react'

const drsearchScreen = 1
const cartScreen = 0
const mapScreen = 2

class UiState {
    login = false
    screen = cartScreen
    claim = new AdjudicationInput
    dispatch = {} as React.Dispatch<UiUpdate>
}
interface UiUpdate {
    screen?: number
    login?: boolean

}
function reducer(state: UiState, update: UiUpdate): UiState {
    const o = {
        ...state,
        ...update
    }
    console.log("o", o)
    return o
}
const UiContext = createContext(new UiState)
function useStore() {
    return useContext(UiContext)
}



export function Cart() {
    let [store, dispatch] = useReducer(reducer, new UiState)
    store = {
        ...store,
        dispatch: dispatch
    }

    const Scr = () => {
        switch (store.screen) {
            case mapScreen:
                return MapScreen()
            case drsearchScreen:
                return Search()
            default:
                return Eob()
        }
    }


    // if logged in
    const login = (x: boolean) => {
        console.log("login", x, dispatch)
        dispatch({ login: x })
    }
    return (<UiContext.Provider value={store}>
        <Scr />
    </UiContext.Provider>)

}
function Card(props: { children: Children }) {
    return (<div className="max-w-sm rounded overflow-hidden shadow-lg">{props.children}</div>)
}
function Eob() {
    const st = useStore()
    const clear = () => { }
    const addRandom = () => { }
    const eobPdf = () => { alert("pdf") }
    const logout = () => { }
    let isEmpty = false

    return (<div >
        <nav className="flex bg-slate-900 p-2" role="navigation" aria-label="main navigation">
            <div className="flex-none"><button className="navbar-tool" onClick={() => { }}>
                <ChevronLeftIcon className="h-6 w-6 text-blue-500" /></button></div>
            <div className="flex-1 text-center">Cart</div>
            <div className="flex-none">

                <button className="navbar-tool " onClick={eobPdf}><PrinterIcon className="h-6 w-6 text-blue-500" /> </button>
            </div>
        </nav>

        <Card>
            <Patient />
            <Lines />
        </Card>
        {st.claim
        {isEmpty ? (<div >
            <div className="card">
                <p></p>
                Cart is empty
            </div>
        </div>)
            : (
                <div><div className="cardlist"></div>

                </div>)}


        {st.login ? <Action onClick={() => st.dispatch({ login: false })} >LOGOUT</Action> :
            <Action onClick={() => st.dispatch({ login: true })}>LOGIN</Action>}
        <Action onClick={addRandom}>RANDOM</Action>
        <Action onClick={clear} >CLEAR</Action>
    </div >)

}
function setScreen(screen: number) {
    let s = useStore()
    s.dispatch({ screen: screen })
}

function Search() {
    return (<div>search</div>)
}

function ModalNav(props: { title: string, setClose: () => void }) {
    return (<nav className="navbar" role="navigation" aria-label="main navigation">
        <button className="navbar-tool" onClick={props.setClose}>
            <XMarkIcon />
        </button>
        <div className="text-sm align-middle flex flex-col justify-center">
            {props.title}
        </div>
    </nav>)
}

function MapScreen() {
    return (<div><ModalNav title='' setClose={() => { }} />
        <Map></Map>
    </div>)
}

function searchInput() {
    return (<form className="p-4 width">

        <label className="relative block box-border">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon />
            </span>
            <input autoFocus
                className="w-full text-black bg-white placeholder:font-italitc border border-slate-300 rounded-half py-2 pl-10 pr-4  focus:outline-none"
                placeholder="Example: Family Nurse near Sheboygan" type="search" />
        </label>
    </form>)
}


function oon() {
    return (<div className="flex items-center p-4"><button className="" onClick={() => setScreen(mapScreen)}>See on map</button>
        <input id="zip" aria-describedby="zip" name="zip" type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-4" />
        <div className="ml-2 text-sm">
            <label htmlFor="comments" className="font-medium text-white"> Include Out of network</label>

        </div>     </div>)
}



function providers() {

    // this is a list of providers to pick from
    return (<>Providers</>)
    /*
    return (<div className=" w-full flex align-middle my-4" style="height:44px" v-htmlFor="item in store.provider">

        <div className="flex-none w-24 pl-4 text-right text-lg mt-1">
            ${Number(item[3]).toFixed(2).toLocaleString()}
        </div>
        <ShoppingCartIcon className="w-8 ml-4" onClick='pickProvider(item[0])' />
        <div className="flex-1 ml-4">
            <div className="flex-1 ">{item[1]}</div>
            <div className="flex-1 text-gray-500">{item[2]}</div>
        </div>
    </div>)*/

}


function askPhone() {
    const submit = () => { }
    return (<form>
        <p><label htmlFor="mobile">Mobile number</label></p>
        <p><input type="tel" autoFocus id="mobile" v-model="mobile" autoComplete="tel" placeholder="" />
        </p>
        <p><input className="button" value="Submit" type="submit" onClick={submit} /></p>
    </form>)
}

function askToken() {
    const login = () => { }
    return (<div>
        <p><label htmlFor="token">Enter Token</label></p>
        <p><input placeholder="" /></p>
        <p><button onClick={login}>Login</button></p>
    </div>)
}


function EobHtml() {
    return (<div v-html="store.eobs"></div>)
}

function SelectSomething() {
    const onchange = () => { }
    const name = ""
    return (<select v-if="store.isLogin()" v-model="store.patient" name="patient" className="pickList" onChange={onchange}>
        <option v-htmlFor="(item) in store.loginData?.state.covered || []" value="item.id">
            {name}
        </option></select >)
}

function Action(props: {
    children: Children
    onClick: () => void
}) {
    return (<div className="ml-2 inline-block" ><button style={{ color: '#0E7AFE' }} onClick={props.onClick}>{props.children}</button></div>)
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
                    <button className="px-4" onClick="drsearch(index)"><svg
                        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
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
    return (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="#808080" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>)
}

function Magnifier() {
    return (<svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
        height="30" viewBox="0 0 30 30">
        <path
            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
        </path>
    </svg>)
}

function PrinterSvg() {
    return (<svg xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#808080" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>)
}

*/
