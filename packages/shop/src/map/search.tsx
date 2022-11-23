

export function Card(props: { children?: ReactNode }) {
    return (<div class='rounded border-gray-400'>
        {props.children}
    </div>)
}


export interface SearchOptions {
    buttons: [string, string, string][]
}
export function MapSearch(props: {
    options?: SearchOptions
    found: ReactNode[]
    suggest: string[]
    setSearch: (x: string)=>void
    near?: [number, number] //  by default will use current location
}) {
    const [search, setSearch] = useState("")

    const b: ReactNode[] = props.options?.buttons.map(e => {
        let [search, icon, text] = e
        return (<button onClick={() => setSearch(search)}>
            <Localized id={icon}>
                <svg /></Localized>
            <Localized id={text}>
                <span /></Localized></button>)
    }) ?? []

    return (
        <div>
            <Mapgl />
            <div className='z-10 fixed p-4'>
                <Card><input placeholder='search'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }} />
                </Card>
                {b}

            </div>
        </div>
    )
}
