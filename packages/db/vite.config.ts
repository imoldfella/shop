import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'main',
            formats: ['es', 'umd'],
            fileName: (format) => `main.${format}.js`,
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