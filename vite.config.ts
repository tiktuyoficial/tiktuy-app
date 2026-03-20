import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/auth': {
        target: 'https://tiktuy-app-backend-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
      '/admin-ventas': {
        target: 'https://tiktuy-app-backend-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
      '/admin-reportes': {
        target: 'https://tiktuy-app-backend-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
      '/repartidor-reportes': {
        target: 'https://tiktuy-app-backend-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
      // ejemplo mas rutas:
      // '/pedido': { target: 'https://...', changeOrigin: true },
      // '/producto': { target: 'https://...', changeOrigin: true },
    },
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'esbuild',
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
