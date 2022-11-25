
export interface Example {
    id: string;
    name: string;
    description: string;
}

const list: Record<string, Example[]> = {
    Basic: [
        {
            id: 'counter',
            name: 'Counter',
            description: 'A simple standard counter example',
        }
    ]
}