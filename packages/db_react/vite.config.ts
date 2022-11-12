import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

function CustomHmr() : PluginOption {
  return {
    name: 'custom-hmr',
    enforce: 'post',
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ftl')) {
        console.log('reloading ftl file...');

        server.ws.send({
          type: 'full-reload',          
          path: '*'
        });
      }
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),CustomHmr()]
})
