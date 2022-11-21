import { schema } from './schema.js';
import { markdownParser, jsonToHtml, htmlToJson } from './remark.js';
import { markdownSerializer } from './to_markdown.js';
import * as pm from 'prosemirror-model';
import * as fs from 'fs';
import * as p from 'path';
export const readJson = (path) => JSON.parse(readString(path));
export const readString = (path) => fs.readFileSync(path, { encoding: 'utf-8' });
export const writeJson = (json, path) => fs.writeFileSync(path, JSON.stringify(json, null, 2));
export const writeString = (s, path) => fs.writeFileSync(path, s, { encoding: 'utf8' });
async function convert(path, out) {
    const ext = p.extname(path);
    const eo = p.extname(out);
    switch (ext + eo) {
        case '.md.dgpm':
            writeJson(await markdownParser(readString(path)), out);
            break;
        case '.dgpm.md':
            const doc = pm.Node.fromJSON(schema, readJson(path));
            writeString(markdownSerializer.serialize(doc), out);
            break;
        case '.dgpm.html':
            writeString(jsonToHtml(readJson(path)), out);
            break;
        case '.html.dgpm':
            writeJson(htmlToJson(readString(path)), out);
            break;
    }
}
async function main() {
    await convert('test/test.html', 'test/test2.dgpm');
    await convert('test/test2.dgpm', 'test/test3.html');
    await convert('test/test.md', 'test/test2b.dgpm');
    await convert('test/test2.dgpm', 'test/test2b.md');
    // convert('test2.dgpm', 'test2.html')
    // convert('test2.html', 'test3.dgpm')
}
(async function () {
    await Promise.resolve(await main());
}());
/*

const parser = DOMParser.fromSchema(schema);
export function htmlToJson(html: string): string {
    const dom = parseHTML(html) as unknown as Node
    return parser.parse(dom).toJSON()
}
const mainSerializer = DOMSerializer.fromSchema(schema);

*/ 
//# sourceMappingURL=main.js.map