import { setSite, SiteStore, SiteLink } from "./site_store";

// https://diataxis.fr/


// this needs to be set from the tab? should we use location instead?
export function testSite(site: string ){
    setSite({
        ...new SiteStore(),
        root: {
            ...new SiteLink(),
            children: [
                {
                    ...new SiteLink(),
                    title: "Guides",
                    href: "guides"
                },
                {
                    ...new SiteLink(),
                    title: "Reference",
                    href: "reference"
                },
            ]
        }
    })
}