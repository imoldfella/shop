import { Node, Mark } from "prosemirror-model";
type MarkSerializerSpec = {
    open: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string);
    close: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string);
    mixable?: boolean;
    expelEnclosingWhitespace?: boolean;
    escape?: boolean;
};
export declare class MarkdownSerializer {
    readonly nodes: {
        [node: string]: (state: MarkdownSerializerState, node: Node, parent: Node, index: number) => void;
    };
    readonly marks: {
        [mark: string]: MarkSerializerSpec;
    };
    readonly options: {
        escapeExtraCharacters?: RegExp;
    };
    constructor(nodes: {
        [node: string]: (state: MarkdownSerializerState, node: Node, parent: Node, index: number) => void;
    }, marks: {
        [mark: string]: MarkSerializerSpec;
    }, options?: {
        escapeExtraCharacters?: RegExp;
    });
    serialize(content: Node, options?: {
        tightLists?: boolean;
    }): string;
}
export declare const markdownSerializer: MarkdownSerializer;
export declare class MarkdownSerializerState {
    readonly nodes: {
        [node: string]: (state: MarkdownSerializerState, node: Node, parent: Node, index: number) => void;
    };
    readonly marks: {
        [mark: string]: MarkSerializerSpec;
    };
    readonly options: {
        tightLists?: boolean;
        escapeExtraCharacters?: RegExp;
    };
    delim: string;
    out: string;
    closed: Node | null;
    inAutolink: boolean | undefined;
    atBlockStart: boolean;
    inTightList: boolean;
    constructor(nodes: {
        [node: string]: (state: MarkdownSerializerState, node: Node, parent: Node, index: number) => void;
    }, marks: {
        [mark: string]: MarkSerializerSpec;
    }, options: {
        tightLists?: boolean;
        escapeExtraCharacters?: RegExp;
    });
    flushClose(size?: number): void;
    wrapBlock(delim: string, firstDelim: string | null, node: Node, f: () => void): void;
    atBlank(): boolean;
    ensureNewLine(): void;
    write(content?: string): void;
    closeBlock(node: Node): void;
    text(text: string, escape?: boolean): void;
    render(node: Node, parent: Node, index: number): void;
    renderContent(parent: Node): void;
    renderInline(parent: Node): void;
    renderList(node: Node, delim: string, firstDelim: (index: number) => string): void;
    inTable: boolean;
    renderTable(node: Node): void;
    esc(str: string, startOfLine?: boolean): string;
    quote(str: string): string;
    repeat(str: string, n: number): string;
    markString(mark: Mark, open: boolean, parent: Node, index: number): string;
    getEnclosingWhitespace(text: string): {
        leading?: string;
        trailing?: string;
    };
}
export {};
