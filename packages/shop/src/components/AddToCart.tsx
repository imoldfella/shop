import { Icon } from "solid-heroicons";
import { shoppingCart } from "solid-heroicons/solid";
import { createSignal, ParentProps } from "solid-js"

export class Cart {
    count = 0
}

export const [getCart, setCart] = createSignal(new Cart)
export function AddToCart() {
    const updatecart = (e: MouseEvent) => {
        const g = getCart();
        setCart({
            count: g.count + 1,
        })

        console.log(g.count)
    }
    return (<p><button class='text-blue-600 hover:underline hover:text-blue-400' onclick={updatecart}>Add to Cart</button></p>)
}

export function AlertBubble(props: ParentProps<{
    count: number
}>) {
    return (<div><span class="relative inline-block">
        {props.children}
        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{getCart().count}</span>
    </span>
    </div>)
}

export function CartButtonCounted() {
    const countstr = () => getCart().count ? getCart().count + "" : ""
    return (<a class="" href='/cart'>
        <div class='inline-block mt-2'>
            <span class='absolute right-2 top-1 text-sm text-white'>{countstr()}</span>
            <Icon class='h-6 w-6  text-blue-600 hover:text-blue-400' path={shoppingCart} /></div></a>)
}

export function Aicon(props: { path: string, href: string }) {
    return <a href={props.href}>
        <div class='inline-block mt-2'>
            <Icon class='h-6 w-6 px-4 text-blue-600 hover:text-blue-400' path={props.path} /></div> </a>
}

/*
.navbar-tool {
  width: 32px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  margin-right: 8px;
  margin-left: 8px;
  line-height: 0;
  font-size: 0;
}*/