
import { ParentComponent } from 'solid-js'

export const Hello: ParentComponent<{ name: string }> = (props) => {
    return (<div>
        <div>hello, {props.name}</div>
        {props.children}
    </div>)
}