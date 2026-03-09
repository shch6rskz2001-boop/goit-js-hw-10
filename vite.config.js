import { defineConfig } from 'vite';
import { sync } from "glob";
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    build: {
      sourcemap: true,git git add .
      outDir: '../dist',
      rollupOptions: {
        // Всі HTML-файли як точки входу
        input: sync('./src/*.html'),
        output: {
          // Винесення node_modules у окремий чанк
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Індивідуальні файли JS
          entryFileNames: '[name].js',
        },
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
    ],
    resolve: {
      // Допомагає Vite знаходити node_modules при імпорті flatpickr / izitoast
      alias: {
        flatpickr: 'flatpickr/dist/flatpickr.js',
        izitoast: 'izitoast/dist/js/iziToast.js',
      },
    },
  };
});
