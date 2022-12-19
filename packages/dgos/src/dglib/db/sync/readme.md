
# sync secrets

server will not send sync on a branch unless the client know its sync secret
the sync key is just a random secret
when it is rotated it must be published to all readers and to the host.

a keypair would offer no additional security, since its value is only hidden to the server, and the server knows the lsn anyway.

in solid we want something like

1. queries may represent trees (crosstab?)
2. query can act like a virtualizer

// this needs to be suspense in general.
// resource uses future, still needs signal for subscription
function async createServerList(params) {
    const db = useDb()
    const [signal, setSignal ] createSignal()
    querysome({ params} , setSignal)  // how do i trigger suspense?
    //
   // return createResource(id, async (p) => query(db,p))
}

```html

const x = createServerList( ) // get the db from the context

<virtualizer> 
    <div style={{ height: x.height() }}
<For each={x().items()}>{(r) => {
    <div onClick={x.fold()}> </div>
    }<For>
</virtualizer>
```
