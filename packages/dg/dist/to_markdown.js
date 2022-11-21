/// A specification for serializing a ProseMirror document as
/// Markdown/CommonMark text.
export class MarkdownSerializer {
    /// Construct a serializer with the given configuration. The `nodes`
    /// object should map node names in a given schema to function that
    /// take a serializer state and such a node, and serialize the node.
    constructor(
    /// The node serializer functions for this serializer.
    nodes, 
    /// The mark serializer info.
    marks, options = {}) {
        this.nodes = nodes;
        this.marks = marks;
        this.options = options;
    }
    /// Serialize the content of the given node to
    /// [CommonMark](http://commonmark.org/).
    serialize(content, options = {}) {
        options = Object.assign(this.options, options);
        let state = new MarkdownSerializerState(this.nodes, this.marks, options);
        state.renderContent(content);
        return state.out;
    }
}
/// A serializer for the [basic schema](#schema).
export const markdownSerializer = new MarkdownSerializer({
    blockquote(state, node) {
        state.wrapBlock("> ", null, node, () => state.renderContent(node));
    },
    code_block(state, node) {
        // Make sure the front matter fences are longer than any dash sequence within it
        const backticks = node.textContent.match(/`{3,}/gm);
        const fence = backticks ? (backticks.sort().slice(-1)[0] + "`") : "```";
        state.write(fence + (node.attrs.params || "") + "\n");
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write(fence);
        state.closeBlock(node);
    },
    heading(state, node) {
        state.write(state.repeat("#", node.attrs.level) + " ");
        state.renderInline(node);
        state.closeBlock(node);
    },
    horizontal_rule(state, node) {
        state.write(node.attrs.markup || "---");
        state.closeBlock(node);
    },
    bullet_list(state, node) {
        state.renderList(node, "  ", () => (node.attrs.bullet || "*") + " ");
    },
    table(state, node) {
        state.renderTable(node);
        state.closeBlock(node);
    },
    ordered_list(state, node) {
        let start = node.attrs.order || 1;
        let maxW = String(start + node.childCount - 1).length;
        let space = state.repeat(" ", maxW + 2);
        state.renderList(node, space, i => {
            let nStr = String(start + i);
            return state.repeat(" ", maxW - nStr.length) + nStr + ". ";
        });
    },
    list_item(state, node) {
        state.renderContent(node);
    },
    paragraph(state, node) {
        state.renderInline(node);
        state.closeBlock(node);
    },
    image(state, node) {
        state.write("![" + state.esc(node.attrs.alt || "") + "](" + node.attrs.src.replace(/[\(\)]/g, "\\$&") +
            (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : "") + ")");
    },
    hard_break(state, node, parent, index) {
        for (let i = index + 1; i < parent.childCount; i++)
            if (parent.child(i).type != node.type) {
                state.write("\\\n");
                return;
            }
    },
    text(state, node) {
        state.text(node.text, !state.inAutolink);
    }
}, {
    em: { open: "*", close: "*", mixable: true, expelEnclosingWhitespace: true },
    strong: { open: "**", close: "**", mixable: true, expelEnclosingWhitespace: true },
    link: {
        open(state, mark, parent, index) {
            state.inAutolink = isPlainURL(mark, parent, index);
            return state.inAutolink ? "<" : "[";
        },
        close(state, mark, parent, index) {
            let { inAutolink } = state;
            state.inAutolink = undefined;
            return inAutolink ? ">"
                : "](" + mark.attrs.href.replace(/[\(\)"]/g, "\\$&") + (mark.attrs.title ? ` "${mark.attrs.title.replace(/"/g, '\\"')}"` : "") + ")";
        },
        mixable: true
    },
    code: { open(_state, _mark, parent, index) { return backticksFor(parent.child(index), -1); },
        close(_state, _mark, parent, index) { return backticksFor(parent.child(index - 1), 1); },
        escape: false }
});
function backticksFor(node, side) {
    let ticks = /`+/g, m, len = 0;
    if (node.isText)
        while (m = ticks.exec(node.text))
            len = Math.max(len, m[0].length);
    let result = len > 0 && side > 0 ? " `" : "`";
    for (let i = 0; i < len; i++)
        result += "`";
    if (len > 0 && side < 0)
        result += " ";
    return result;
}
function isPlainURL(link, parent, index) {
    if (link.attrs.title || !/^\w+:/.test(link.attrs.href))
        return false;
    let content = parent.child(index);
    if (!content.isText || content.text != link.attrs.href || content.marks[content.marks.length - 1] != link)
        return false;
    return index == parent.childCount - 1 || !link.isInSet(parent.child(index + 1).marks);
}
/// This is an object used to track state and expose
/// methods related to markdown serialization. Instances are passed to
/// node and mark serialization methods (see `toMarkdown`).
export class MarkdownSerializerState {
    /// @internal
    constructor(
    /// @internal
    nodes, 
    /// @internal
    marks, 
    /// The options passed to the serializer.
    options) {
        this.nodes = nodes;
        this.marks = marks;
        this.options = options;
        /// @internal
        this.delim = "";
        /// @internal
        this.out = "";
        /// @internal
        this.closed = null;
        /// @internal
        this.inAutolink = undefined;
        /// @internal
        this.atBlockStart = false;
        /// @internal
        this.inTightList = false;
        this.inTable = false;
        if (typeof this.options.tightLists == "undefined")
            this.options.tightLists = false;
    }
    /// @internal
    flushClose(size = 2) {
        if (this.closed) {
            if (!this.atBlank())
                this.out += "\n";
            if (size > 1) {
                let delimMin = this.delim;
                let trim = /\s+$/.exec(delimMin);
                if (trim)
                    delimMin = delimMin.slice(0, delimMin.length - trim[0].length);
                for (let i = 1; i < size; i++)
                    this.out += delimMin + "\n";
            }
            this.closed = null;
        }
    }
    /// Render a block, prefixing each line with `delim`, and the first
    /// line in `firstDelim`. `node` should be the node that is closed at
    /// the end of the block, and `f` is a function that renders the
    /// content of the block.
    wrapBlock(delim, firstDelim, node, f) {
        let old = this.delim;
        this.write(firstDelim != null ? firstDelim : delim);
        this.delim += delim;
        f();
        this.delim = old;
        this.closeBlock(node);
    }
    /// @internal
    atBlank() {
        return /(^|\n)$/.test(this.out);
    }
    /// Ensure the current content ends with a newline.
    ensureNewLine() {
        if (!this.atBlank())
            this.out += "\n";
    }
    /// Prepare the state for writing output (closing closed paragraphs,
    /// adding delimiters, and so on), and then optionally add content
    /// (unescaped) to the output.
    write(content) {
        this.flushClose();
        if (this.delim && this.atBlank())
            this.out += this.delim;
        if (content)
            this.out += content;
    }
    /// Close the block for the given node.
    closeBlock(node) {
        this.closed = node;
    }
    /// Add the given text to the document. When escape is not `false`,
    /// it will be escaped.
    text(text, escape = true) {
        let lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            this.write();
            // Escape exclamation marks in front of links
            if (!escape && lines[i][0] == "[" && /(^|[^\\])\!$/.test(this.out))
                this.out = this.out.slice(0, this.out.length - 1) + "\\!";
            this.out += escape ? this.esc(lines[i], this.atBlockStart) : lines[i];
            if (i != lines.length - 1)
                this.out += "\n";
        }
    }
    /// Render the given node as a block.
    render(node, parent, index) {
        if (typeof parent == "number")
            throw new Error("!");
        if (!this.nodes[node.type.name]) {
            console.log("Token type `" + node.type.name + "` not supported by Markdown renderer");
            console.log("Supports: ", this.nodes.keys);
            return;
        }
        this.nodes[node.type.name](this, node, parent, index);
    }
    /// Render the contents of `parent` as block nodes.
    renderContent(parent) {
        parent.forEach((node, _, i) => this.render(node, parent, i));
    }
    /// Render the contents of `parent` as inline content.
    renderInline(parent) {
        this.atBlockStart = true;
        let active = [], trailing = "";
        let progress = (node, offset, index) => {
            let marks = node ? node.marks : [];
            // Remove marks from `hard_break` that are the last node inside
            // that mark to prevent parser edge cases with new lines just
            // before closing marks.
            // (FIXME it'd be nice if we had a schema-agnostic way to
            // identify nodes that serialize as hard breaks)
            if (node && node.type.name === "hard_break")
                marks = marks.filter(m => {
                    if (index + 1 == parent.childCount)
                        return false;
                    let next = parent.child(index + 1);
                    return m.isInSet(next.marks) && (!next.isText || /\S/.test(next.text));
                });
            let leading = trailing;
            trailing = "";
            // If whitespace has to be expelled from the node, adjust
            // leading and trailing accordingly.
            if (node && node.isText && marks.some(mark => {
                let info = this.marks[mark.type.name];
                return info && info.expelEnclosingWhitespace &&
                    !(mark.isInSet(active) || index < parent.childCount - 1 && mark.isInSet(parent.child(index + 1).marks));
            })) {
                let [_, lead, inner, trail] = /^(\s*)(.*?)(\s*)$/m.exec(node.text);
                leading += lead;
                trailing = trail;
                if (lead || trail) {
                    node = inner ? node.withText(inner) : null;
                    if (!node)
                        marks = active;
                }
            }
            let inner = marks.length ? marks[marks.length - 1] : null;
            let noEsc = inner && this.marks[inner.type.name].escape === false;
            let len = marks.length - (noEsc ? 1 : 0);
            // Try to reorder 'mixable' marks, such as em and strong, which
            // in Markdown may be opened and closed in different order, so
            // that order of the marks for the token matches the order in
            // active.
            outer: for (let i = 0; i < len; i++) {
                let mark = marks[i];
                if (!this.marks[mark.type.name].mixable)
                    break;
                for (let j = 0; j < active.length; j++) {
                    let other = active[j];
                    if (!this.marks[other.type.name].mixable)
                        break;
                    if (mark.eq(other)) {
                        if (i > j)
                            marks = marks.slice(0, j).concat(mark).concat(marks.slice(j, i)).concat(marks.slice(i + 1, len));
                        else if (j > i)
                            marks = marks.slice(0, i).concat(marks.slice(i + 1, j)).concat(mark).concat(marks.slice(j, len));
                        continue outer;
                    }
                }
            }
            // Find the prefix of the mark set that didn't change
            let keep = 0;
            while (keep < Math.min(active.length, len) && marks[keep].eq(active[keep]))
                ++keep;
            // Close the marks that need to be closed
            while (keep < active.length)
                this.text(this.markString(active.pop(), false, parent, index), false);
            // Output any previously expelled trailing whitespace outside the marks
            if (leading)
                this.text(leading);
            // Open the marks that need to be opened
            if (node) {
                while (active.length < len) {
                    let add = marks[active.length];
                    active.push(add);
                    this.text(this.markString(add, true, parent, index), false);
                }
                // Render the node. Special case code marks, since their content
                // may not be escaped.
                if (noEsc && node.isText)
                    this.text(this.markString(inner, true, parent, index) + node.text +
                        this.markString(inner, false, parent, index + 1), false);
                else
                    this.render(node, parent, index);
            }
        };
        parent.forEach(progress);
        progress(null, 0, parent.childCount);
        this.atBlockStart = false;
    }
    /// Render a node's content as a list. `delim` should be the extra
    /// indentation added to all lines except the first in an item,
    /// `firstDelim` is a function going from an item index to a
    /// delimiter for the first line of the item.
    renderList(node, delim, firstDelim) {
        if (this.closed && this.closed.type == node.type)
            this.flushClose(3);
        else if (this.inTightList)
            this.flushClose(1);
        let isTight = typeof node.attrs.tight != "undefined" ? node.attrs.tight : this.options.tightLists;
        let prevTight = this.inTightList;
        this.inTightList = isTight;
        node.forEach((child, _, i) => {
            if (i && isTight)
                this.flushClose(1);
            this.wrapBlock(delim, firstDelim(i), node, () => this.render(child, node, i));
        });
        this.inTightList = prevTight;
    }
    renderTable(node) {
        this.flushClose(1);
        let headerBuffer = "";
        const prevTable = this.inTable;
        this.inTable = true;
        // ensure there is an empty newline above all tables
        this.out += "\n";
        // rows
        node.forEach((row, _, i) => {
            // cols
            row.forEach((cell, _, j) => {
                this.out += j === 0 ? "| " : " | ";
                cell.forEach(para => {
                    // just padding the output so that empty cells take up the same space
                    // as headings.
                    // TODO: Ideally we'd calc the longest cell length and use that
                    // to pad all the others.
                    if (para.textContent === "" && para.content.size === 0) {
                        this.out += "  ";
                    }
                    else {
                        this.closed = null;
                        this.render(para, row, j);
                    }
                });
                if (i === 0) {
                    if (cell.attrs.alignment === "center") {
                        headerBuffer += "|:---:";
                    }
                    else if (cell.attrs.alignment === "left") {
                        headerBuffer += "|:---";
                    }
                    else if (cell.attrs.alignment === "right") {
                        headerBuffer += "|---:";
                    }
                    else {
                        headerBuffer += "|----";
                    }
                }
            });
            this.out += " |\n";
            if (headerBuffer) {
                this.out += `${headerBuffer}|\n`;
                headerBuffer = "";
            }
        });
        this.inTable = prevTable;
    }
    /// Escape the given string so that it can safely appear in Markdown
    /// content. If `startOfLine` is true, also escape characters that
    /// have special meaning only at the start of the line.
    esc(str, startOfLine = false) {
        str = str.replace(/[`*\\~\[\]_]/g, (m, i) => m == "_" && i > 0 && i + 1 < str.length && str[i - 1].match(/\w/) && str[i + 1].match(/\w/) ? m : "\\" + m);
        if (startOfLine)
            str = str.replace(/^[#\-*+>]/, "\\$&").replace(/^(\s*\d+)\./, "$1\\.");
        if (this.options.escapeExtraCharacters)
            str = str.replace(this.options.escapeExtraCharacters, "\\$&");
        return str;
    }
    /// @internal
    quote(str) {
        let wrap = str.indexOf('"') == -1 ? '""' : str.indexOf("'") == -1 ? "''" : "()";
        return wrap[0] + str + wrap[1];
    }
    /// Repeat the given string `n` times.
    repeat(str, n) {
        let out = "";
        for (let i = 0; i < n; i++)
            out += str;
        return out;
    }
    /// Get the markdown string for a given opening or closing mark.
    markString(mark, open, parent, index) {
        let info = this.marks[mark.type.name];
        let value = open ? info.open : info.close;
        return typeof value == "string" ? value : value(this, mark, parent, index);
    }
    /// Get leading and trailing whitespace from a string. Values of
    /// leading or trailing property of the return object will be undefined
    /// if there is no match.
    getEnclosingWhitespace(text) {
        return {
            leading: (text.match(/^(\s+)/) || [undefined])[0],
            trailing: (text.match(/(\s+)$/) || [undefined])[0]
        };
    }
}
//# sourceMappingURL=to_markdown.js.map