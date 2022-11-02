

/*
// would we key
interface ScrollOptions {
    data: QueryResult
}
function xx(x: ReactElement) {
    x.key
}
function Scroller(props: { options: ScrollOptions }) {
    // we need to subscribe to the query result. when it changes we need to adjust accordingly. We can't 
    useEffect(() => {

    }

    )
    const o = props.options.count
    return (<div ></div>)
}

//x = <QueryResult value={ }
class QueryResults {
    scroll: number = 0
}

function ShowResults(props: { results: QueryResults }) {
    // we need to provide a way to update.
    const opt: ScrollOptions = {
        load: function (n: number): React.ReactElement {
            throw new Error('Function not implemented.')
        },
        tombstone: function (): React.ReactElement {
            throw new Error('Function not implemented.')
        }
    }
    // ?
    const [o, setState] = useState(opt)

    // this is awkward to apply a diff to.
    return (
        <Scroller options={opt} scrollMe={setState} />
    )
}
*/