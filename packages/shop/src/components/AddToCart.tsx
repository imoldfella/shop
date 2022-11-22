import { Icon } from "solid-heroicons";
import { shoppingCart } from "solid-heroicons/solid";
import { createSignal, ParentProps } from "solid-js"

export class Cart {
    count = 0
}

export const [getCart,setCart] = createSignal(new Cart)
export function AddToCart() {
    const updatecart = (e: MouseEvent) => {
        const g = getCart();
        setCart({
            count: g.count+1
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
    return (<AlertBubble count={getCart().count}><a class="navbar-tool" href='/cart'><Icon path={shoppingCart }/> </a></AlertBubble>)
}