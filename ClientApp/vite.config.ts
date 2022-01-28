import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteStylelintPlugin from '@amatlash/vite-plugin-stylelint'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vuePlugin(),
    eslintPlugin(),
    viteStylelintPlugin()
  ]
})
