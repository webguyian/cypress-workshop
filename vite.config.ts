import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [
    react(),
    tailwindcss(),
    istanbul({
      cypress: true,
      extension: ['.js', '.ts', '.jsx', '.tsx'],
      include: 'src/**/*',
      requireEnv: false,
      nycrcPath: './.nycrc.json',
      forceBuildInstrument: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
});
