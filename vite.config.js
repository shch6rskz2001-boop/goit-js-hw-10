import { defineConfig } from 'vite';
import { glob } from 'glob'; // Исправлено: именованный импорт для новых версий glob
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true, // Добавлено для очистки папки dist перед сборкой
    sourcemap: true,
    rollupOptions: {
      // Все HTML-файлы как точки входа
      input: glob.sync('./src/*.html'),
      output: {
        // Стандартные настройки именования для корректной работы путей
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
  // БЛОК alias УДАЛЕН — Vite сам найдет flatpickr и izitoast
});
