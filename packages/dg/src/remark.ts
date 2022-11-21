import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { parseHTML, createHTMLDocument, VHTMLDocument } from 'zeed-dom'
import * as pm from 'prosemirror-model'
import {schema} from './schema.js'


export const  domParser = pm.DOMParser.fromSchema(schema);
export function htmlToJson(html: string): string {
    const dom = parseHTML(html) as unknown as Node
    return domParser.parse(dom).toJSON()
}

export function jsonToHtml(json: any): string {
    const doc =  pm.Node.fromJSON(schema, json)
    const document = pm.DOMSerializer
    .fromSchema(schema)
    .serializeFragment(doc.content, {
        document: (createHTMLDocument() as unknown as Document),
    }) as unknown as VHTMLDocument
    return document.render()
}

export async function markdownParser(md: string) : Promise<Object> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md)

    // parse into html, then use dom serializer
    return htmlToJson(String(file))
}