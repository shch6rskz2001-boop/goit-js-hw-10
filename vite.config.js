import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    build: {
      sourcemap: true,
      outDir: '../dist',
      rollupOptions: {
        // Всі HTML-файли як точки входу
        input: glob.sync('./src/*.html'),
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
      // Це допомагає Vite знаходити node_modules при імпорті flatpickr / izitoast
      alias: {
        flatpickr: 'flatpickr/dist/flatpickr.js',
        izitoast: 'izitoast/dist/js/iziToast.js',
      },
    },
  };
});
