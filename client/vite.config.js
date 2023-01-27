import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  server: {
    proxy: {
      '/posts': 'http://localhost:3001',
      '/me': 'http://localhost:3001',
      '/user': 'http://localhost:3001',
      '/follow': 'http://localhost:3001',
      '/unfollow': 'http://localhost:3001',
    },
  },
  plugins: [react()],
});
