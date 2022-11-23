import { Claim } from './config'

export function randomClaim() {
    return new Claim([
        {
            code: '70450',
            desc: ' CT scan head or brain without dye',
            npi: '1234567890',
            provider: 'Jill, MD'
        },
        {
            code: '70451',
            desc: 'Anesthesia',
            npi: '1234567891',
            provider: 'Joe, MD',
        }
    ])
}