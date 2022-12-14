import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';


const crossOriginIsolation = () => ({
  name: 'configure-server',

  configureServer(server) {
    server.middlewares.use((_req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  }

});
export default defineConfig({
  worker: {
    plugins: [
    ]
  },
  plugins: [

    solidPlugin(),
    crossOriginIsolation()],
  
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
