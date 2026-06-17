import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // upewnij się, że ten import pasuje do Twojego pliku
import path from 'path';

export default defineConfig(() => {
  return {
    base: './', // Wymagane dla podfolderów w portfolio

    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    
    build: {
      outDir: path.resolve(__dirname, '../'), // Automatycznie wyrzuci pliki poziom wyżej
      emptyOutDir: false, // Ochroni Twój plik meta.json przed skasowaniem
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});