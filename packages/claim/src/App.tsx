
import { useClaims } from "../lib/store"
import { Cart } from "../lib/ui"

function App() {
    // const [state, dispatch] = useReducer(reducer, { hello: "jim" })
    return (<Cart/>)
}

function FuzzBuzz() {
    const state = useClaims()
    const foo = () => state.dispatch!({
        type: "1",
        to: "john"
    })
    return (
        <div>fuzzbuzz {state.hello}
            <button onClick={foo} >change</button>
        </div>
    )
}

export default App