import { ParentComponent } from 'solid-js'

export const hellowWorld: ParentComponent<{ name: string }> = (props) => {
    return (<div>
        <div>hello, {props.name}</div>
        {props.children}
    </div>)
}