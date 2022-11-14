import { RailApp, useWorld} from '../core'
import {Avatar } from '../form'
import { ServerSearch } from '../layout'
import { SettingsApp } from './settings'
import React, { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Localized } from '@fluent/react';

// each rail app is a directory app,



export class AccountApp extends RailApp {
    render(): JSX.Element {
        return (
            <>
                <ServerSearch />
                <ServerButtons />
                <div>
                    <a onClick={() => { }}>Settings</a>
                    <a onClick={() => { }}>Create Server</a>
                    <a onClick={() => { }}>Find Server</a>
                </div></>)

    }
    fullScreen = false
    constructor() {
        super();
    }
    icon() {
        return (<Avatar />)
    }
}

export function ServerButtons() {
    const w = useWorld()

    const createServer = () => {
        w.update({
            focusApp: new CreateServer()
        })
    }
    const findServer = () => {
        w.update({
            focusApp: new FindServer()
        })
    }
    const settings = () => {
        w.update({
            focusApp: new SettingsApp()
        })
    }
    return (
        <>
            <li><button onClick={settings}>Settings</button></li>
            <li><button onClick={createServer}>Create Server</button></li>
            <li><button onClick={findServer}>Find Server</button></li>
        </>
    )
}

export class CreateServer extends RailApp {
    fullScreen = true
    icon() {
        return (<PlusIcon className='h-6 w-6 m-2' title='Create Server' />)
    }
    render() {
        return (<div>Add Server</div>)
    }
}
export class FindServer extends RailApp {
    fullScreen = true
    icon() {
        return (<MagnifyingGlassIcon className='h-6 w-6 m-2' title='Find Server' />)
    }
    render() {
        return (<div>Find Server</div>)
    }
}
