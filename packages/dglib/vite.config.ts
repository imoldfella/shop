



import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';


export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    solidPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});


/*

import { defineConfig } from 'vite';


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

*/
