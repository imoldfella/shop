import * as pm from 'prosemirror-model';
export declare const domParser: pm.DOMParser;
export declare function htmlToJson(html: string): string;
export declare function jsonToHtml(json: any): string;
export declare function markdownParser(md: string): Promise<Object>;
