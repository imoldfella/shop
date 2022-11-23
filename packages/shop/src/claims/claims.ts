
import fs from 'fs/promises'

// we keep each language in its own file to make translation and fallback easier
// there is probably a better way to do this with db tech.
// how do we find our own asset data?

export interface ProcCode {
    code: string,
    lang: string,
    // we should have wikipedia references here
    // a really nice thing would be to have "Contribute to Wikipedia" if it doesn't exist. Potentially our own as well

    // this is really a map, we could add more things here, but statically type things we care about.
    description: {
      short: string,
      long: string,
      gpt3: string
    }
}

export interface ProcFolder {
    name: string      // unique name, concatenated with "-"
    lang: string
    label: string
    icon: JSX.Element
    folder: ProcFolder[]
    code: ProcCode[]
}


// top level
export interface LanguageInfo { 
    lang: string

    tl: {
        [key: string]: string
    }
}


const root = 'src/claims/i18n'

export async function useLanguages() : Promise<LanguageInfo[]> {
    const files = await fs.readdir(root)

    const fx = async (e: string) : Promise<LanguageInfo> => {
        const index = await fs.readFile(root + "/" + e + "/index.json", {encoding: 'utf8'});
        const tl = JSON.parse(index)

        return {
            lang: e,
            tl: tl
        }
    }
    return await Promise.all(files.map(async (e)=> await fx(e)))
}

export async function procCodes1(lang: string) {
    const b = await fs.readFile(`${root}/${lang}/codes.json`,{encoding: 'utf8'})
    const codes = JSON.parse(b) as ProcCode[]
    return codes
}
// one code for every language * cpt code.
// when expanding beyond cpt code, don't want to use ":" to concatenate qualifier
// use "-" instead.
export async function procCodes() : Promise<ProcCode[]>{
    let r : ProcCode[] = []

    // we can glob the languages in config/i18n, but do we need some better way of language iteration?
    for (let o of await useLanguages()){
        r = [...r,...await procCodes1(o.lang)]
    }

    return r

}

// we need to iterate these to build a folder for each collection of codes * every language
// code sets may overlap.
// the folder may have culturally sensitive icon, or fallback to generic one.
// folders may have child collections and parent collections.



// a Folder consists of codes and 
export async  function procFolders() : Promise<ProcFolder[]> {

    return []
}