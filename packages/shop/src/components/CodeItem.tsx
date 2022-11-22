
import { Icon } from "solid-heroicons"
import { xMark, chevronLeft, chevronRight, shoppingCart } from 'solid-heroicons/solid'
import '@astrojs/solid-js'

export function CodeItem(props: { title: string, subtitle: string, code: string }) {
    return (<div class="fileList hover:bg-slate-900">
        <a class="fl-tool pl-4">
            <Icon path={shoppingCart} class='h-6 w-6' />
        </a>
        <a class="card" href={"/code/" + props.code}>
            <div class="fl-title"><span>{props.title}</span></div>
            <div class="fl-subtitle"><span>{props.subtitle}</span></div>
        </a>
        <a class="fl-tool" href={"code/" + props.code}>
            <Icon path={chevronRight} class='w-6 h-6' />
        </a>
    </div>)
}