import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
import topLevelAwait from "vite-plugin-top-level-await"
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      topLevelAwait()
    ]
  },
  integrations: [tailwind(), solidJs()]
});