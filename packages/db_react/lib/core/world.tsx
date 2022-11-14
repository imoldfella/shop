import React, { useState } from 'react'
import { useEffect } from "react";
import { negotiateLanguages } from "@fluent/langneg";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { ReactLocalization, LocalizationProvider, useLocalization } from "@fluent/react";
import { Avatar } from '../form/avatar'
import { useIsMobile } from './hooks'


//let { l10n } = useLocalization();
//alert(l10n.getString("hello"));

// the sticky files per server can be per device


export interface LabeledId {
    id: string
    label: string
}

export interface File extends LabeledId {
    type: string
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export class AppRegistry {
    [key: string]: RailApp[]

}
// no login is a guest of some server, so only that server will appear in the rail
interface Login {
    username: string
}
export interface App {
    panning?: boolean
    icon: (x: any) => JSX.Element
    render: (x: any) => JSX.Element
}
export class RailApp {
    icon(): JSX.Element {
        return (<Avatar />)
    }
    render(): JSX.Element {
        return (<div>WIP</div>)
    }
    renderMain(): JSX.Element {
        return (<div>WIP</div>)
    }

    open: App[] = []
    selected = 0
}

export class World {
    publicMode = false
    login?: boolean
    ws: WebSocket | undefined
    bip39: string = ""
    altLogin: Login[] = []

    rail: RailApp[] = []
    app = new AppRegistry()
    focusApp = new RailApp()
    railSelect = 0

    // local things, should these be in a different object?
    showSidebar = true
    locale = { id: 'es', label: 'Español' }
    locales: LabeledId[] = []
    systemDark = true
    isMobile = false
    update = (x: Partial<World>) => { }

    static world = new World()
}

const worldContext = React.createContext<World>(World.world)
// each app needs to define 
export function useWorld() {
    return React.useContext(worldContext)
}

async function fetchMessages(locale: string): Promise<[string, string]> {
    const url = locale + ".ftl";
    let response = await fetch(url);
    console.log("fetch ", locale, response)
    let messages = await response.text();
    return [locale, messages];
}

function* lazilyParsedBundles(fetchedMessages: Array<[string, string]>) {
    for (let [locale, messages] of fetchedMessages) {
        let resource = new FluentResource(messages);
        let bundle = new FluentBundle(locale);
        bundle.addResource(resource);
        yield bundle;
    }
}


function systemDark(): boolean {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches
}



function wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// this can be yes, no, maybe 
// maybe if offline and we haven't used this identity before.
export async function login(bip: string): Promise<string> {
    await wait(3000)
    return "connection-failed"
}
export function WorldProvider(props: React.PropsWithChildren<{}>) {
    const mobile = useIsMobile()
    const locales = World.world.locales.map((e) => e.id)
    // takes a list of preferences
    let [currentLocales, setCurrentLocales] = useState([World.world.locale.id]);
    let [l10n, setL10n] = useState<ReactLocalization | null>(null);
    const { Provider } = worldContext
    const reducer = (state: World, action: Partial<World>) => {
        if (action.locale) {
            changeLocales([action.locale.id])
        }

        World.world = {
            ...state,
            ...action
        }

        let x = systemDark()
        if (!World.world.systemDark) {
            x = !x
        }
        if (x) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }


        return World.world
    }
    const [state, dispatch] = React.useReducer(reducer, World.world)
    World.world.update = dispatch
    World.world.isMobile = mobile
    const locale = World.world.locale.id
    // used to set the users desired local
    async function changeLocales(locale: string[]) {
        let currentLocales = negotiateLanguages(
            locale,
            locales,
            { defaultLocale: 'en' }
        );
        setCurrentLocales(currentLocales);
        let fetchedMessages = await Promise.all(currentLocales.map(fetchMessages));
        let bundles = lazilyParsedBundles(fetchedMessages);
        setL10n(new ReactLocalization(bundles));
    }
    useEffect(() => {
        changeLocales(['es']) //navigator.languages as Array<string>);
    }, []);

    if (l10n === null) {
        return <div>Loading…</div>;
    }

    return (
        <LocalizationProvider l10n={l10n}>
            <Provider value={World.world}>
                {props.children}
            </Provider></LocalizationProvider>)
}





/*

      <hr />
      <select
        onChange={event => changeLocales([event.target.value])}
        value={currentLocales[0]}
      >
        {Object.entries(AVAILABLE_LOCALES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
*/