import { Show, JSX } from "solid-js"
import { clear, login, getUi, setScreen, mapScreen } from "./store"

function Patient() {
    return <div></div>
}
function Lines() {
    return <div></div>
}

export function Eob() {
    return (<div >
        <Show when={true}>
            <EobCard>
                <Patient />
                <Lines />
            </EobCard>
        </Show>

        <Show when={getUi().login}>

        </Show>

        <Action onclick={() => login(true)}>LOGIN</Action>
        <Action onclick={() => clear()} >CLEAR</Action>
        <Action onclick={() => login(false)} >LOGOUT</Action> :
    </div>)
}
export function Action(props: {
    children: JSX.Element
    onclick: () => void
}) {
    return (<div class="ml-2 inline-block" ><button style={{ color: '#0E7AFE' }} onClick={props.onclick}>{props.children}</button></div>)
}

function EobCard(props: { children: JSX.Element }) {
    return (<div class="max-w-sm rounded overflow-hidden shadow-lg">{props.children}</div>)
}


// checkbox to include out of network. Probably delete
export function oon() {
    return (<div class="flex items-center p-4"><button class="" onClick={() => setScreen(mapScreen)}>See on map</button>
        <input id="zip" aria-describedby="zip" name="zip" type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-4" />
        <div class="ml-2 text-sm">
            <label for="comments" class="font-medium text-white"> Include Out of network</label>

        </div>     </div>)
}



export function providers() {

    // this is a list of providers to pick from
    return (<>Providers</>)
    /*
    return (<div class=" w-full flex align-middle my-4" style="height:44px" v-htmlFor="item in store.provider">

        <div class="flex-none w-24 pl-4 text-right text-lg mt-1">
            ${Number(item[3]).toFixed(2).toLocaleString()}
        </div>
        <ShoppingCartIcon class="w-8 ml-4" onClick='pickProvider(item[0])' />
        <div class="flex-1 ml-4">
            <div class="flex-1 ">{item[1]}</div>
            <div class="flex-1 text-gray-500">{item[2]}</div>
        </div>
    </div>)*/

}


export function askPhone() {
    const submit = () => { }
    return (<form>
        <p><label for="mobile">Mobile number</label></p>
        <p><input type="tel" autofocus id="mobile" v-model="mobile" autocomplete="tel" placeholder="" />
        </p>
        <p><input class="button" value="Submit" type="submit" onClick={submit} /></p>
    </form>)
}

export function askToken() {
    const login = () => { }
    return (<div>
        <p><label for="token">Enter Token</label></p>
        <p><input placeholder="" /></p>
        <p><button onClick={login}>Login</button></p>
    </div>)
}


export function EobHtml() {
    return (<div v-html="store.eobs"></div>)
}

export function SelectSomething() {
    const onchange = () => { }
    const name = ""
    return (<select v-if="store.isLogin()" v-model="store.patient" name="patient" class="pickList" onChange={onchange}>
        <option v-htmlFor="(item) in store.loginData?.state.covered || []" value="item.id">
            {name}
        </option></select >)
}