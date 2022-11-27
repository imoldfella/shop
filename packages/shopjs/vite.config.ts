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
    solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
