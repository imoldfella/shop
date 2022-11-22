import React, { useContext, useReducer } from 'react';

interface Store {
    hello: string
    dispatch: React.Dispatch<Tx1|Tx2>
}
interface Tx1 {
    type: "1"
    to: string,
}
interface Tx2 {
    type: "2"
    data: string
}

const store : Store = {
    hello: "jill",
    dispatch: {} as  React.Dispatch<Tx1|Tx2>
}

function reducer(state: Store, action: Tx1 | Tx2): Store {
    switch (action.type) {
        case "1":
            return {
                ...state,
                hello: action.to,
            }
        default:
            return state
    }
}

// onl
const ClaimContext = React.createContext(store)

// use this to read the cart context
export function useClaims() {
    return useContext(ClaimContext)
}

// use this to establish in the widget tree
export function ClaimsProvider(props: {children?: React.ReactNode}) {
    const [st,dispatch] =useReducer(reducer, store)
    const st2 = {
        ...st,
        dispatch: dispatch
    }
    return (<ClaimContext.Provider value={st2} >
        {props.children}</ClaimContext.Provider>)
}