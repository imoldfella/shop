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
      server: {
        proxy:{
            '/db': {
                target: 'http://localhost:8080',
                secure: false,
            },
            '/fonts': {
              target: 'http://localhost:8080',
              secure: false,
            } 
        }
    },
    plugins: [
      topLevelAwait()
    ]
  },
  integrations: [tailwind(), solidJs()]
});