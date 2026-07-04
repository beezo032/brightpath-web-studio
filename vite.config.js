import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { 'react-helmet-async': new URL('./src/seo/helmetShim.jsx', import.meta.url).pathname },
  },
  build: { chunkSizeWarningLimit: 1000 },
  server: {
    proxy: { '/api': { target: 'http://127.0.0.1:3001', changeOrigin: true } },
  },
});
