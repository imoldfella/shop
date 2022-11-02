import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
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
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'map',
            formats: ['es', 'umd'],
            fileName: (format) => `map.${format}.js`,
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