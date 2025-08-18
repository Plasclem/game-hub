import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/affectations': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/notify': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/events': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/snapshots': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()]
});
