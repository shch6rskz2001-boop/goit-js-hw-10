import { defineConfig } from 'vite';
import { sync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src', // корінь проєкту
  build: {
    outDir: '../dist', // куди скласти збірку
    sourcemap: true,
    rollupOptions: {
      // всі HTML-файли як точки входу
      input: sync('./src/*.html'),
      output: {
        // винесення node_modules у окремий чанк
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // індивідуальні файли JS
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']), // live reload при зміні HTML
  ],
  resolve: {
    alias: {
      // щоб Vite міг знайти CSS та JS для flatpickr і iziToast
      flatpickr: 'flatpickr/dist/flatpickr.js',
      izitoast: 'izitoast/dist/js/iziToast.js',
    },
  },
});
