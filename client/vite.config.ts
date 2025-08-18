import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/affectations': 'http://localhost:3001',
      '/notify': 'http://localhost:3001',
      '/events': 'http://localhost:3001',
      '/snapshots': 'http://localhost:3001'
    }
  },
  plugins: [react()]
});
