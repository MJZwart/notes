import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite';
import laravel from 'laravel-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    laravel({
        input: ['src/main.ts'],
        refresh: true,
    }),
  ],
});
