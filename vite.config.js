import { defineConfig } from 'vite';
import { sync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true, 
    sourcemap: true,
    rollupOptions: {
    
      input: sync('./src/*.html'),
      output: {
      
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
  ],

});
