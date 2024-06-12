import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/epub-reader-web/',
  build: {
    target: 'esnext',
  },
  plugins: [
    vue(),
    unoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
