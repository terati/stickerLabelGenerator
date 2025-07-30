import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        newtab: "newtab.html",
        autoAnalyze: "src/scripts/autoAnalyze.ts"
        
        // invoiceScrape: "src/scripts/invoiceScrape.ts"
        
        
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        dir: 'dist'
      }
    },
  },
})
