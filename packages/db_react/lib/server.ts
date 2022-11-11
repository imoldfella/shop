

interface AppRegistry {
    [key: string]: App
}
interface File {
    app: string
    path: Uint8Array // count and path
}

// we need to remember which ones are expanded
class BranchReader {
    expand(f: File) {

    }
    get length(): number {
        return 0
    }
    slice(from: number, to: number): File[] {
        return []
    }
}
const user = {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    {
        name: 'Inboxes',
        href: '#',
        children: [
            { name: 'Technical Support', href: '#' },
            { name: 'Sales', href: '#' },
            { name: 'General', href: '#' },
        ],
    },
    { name: 'Reporting', href: '#', children: [] },
    { name: 'Settings', href: '#', children: [] },
]
type Server = {
    name: string,
    href: string,
    icon: (x: any) => JSX.Element
}
// this needs to be a parameter, menu at the top, then context.

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
]


export class Store {
    server: Server[] = [
        { name: 'Open', href: '#', icon: InboxIcon },
        { name: 'Archive', href: '#', icon: ArchiveBoxIcon },
        { name: 'Customers', href: '#', icon: UserCircleIcon },
        { name: 'Flagged', href: '#', icon: FlagIcon, },
        { name: 'Spam', href: '#', icon: NoSymbolIcon, },
        { name: 'Drafts', href: '#', icon: PencilSquareIcon, },
    ]
}