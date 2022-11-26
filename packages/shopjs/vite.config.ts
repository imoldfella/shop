import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { nodeTypes } from "@mdx-js/mdx";
import mdx from "@mdx-js/rollup";
import rehypeRaw from "rehype-raw";
//import remarkShikiTwoslash from "remark-shiki-twoslash";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkShikiTwoslash from "remark-shiki-twoslash";

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [rehypeSlug, [rehypeRaw, { passThrough: nodeTypes }]],
        remarkPlugins: [
          remarkGfm,
          [
            (remarkShikiTwoslash as any).default,
            {
              disableImplicitReactImport: true,
              includeJSDocInHover: true,
              // theme: "css-variables",
              themes: ["github-light", "github-dark"],
              defaultOptions: {
                lib: ["dom", "es2015"],
              },
              defaultCompilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                target: "ESNext",
                module: "ESNext",
                lib: ["dom", "es2015"],
                jsxImportSource: "solid-js",
                jsx: "preserve",
                types: ["vite/client"],
                paths: {
                  "~/*": ["./src/*"],
                },
              },
            },
          ],
        ],
      }),
      enforce: "pre",
    },
    solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
