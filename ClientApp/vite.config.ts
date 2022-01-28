import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import VitePluginStylelint from '@amatlash/vite-plugin-stylelint'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    eslintPlugin(),
    VitePluginStylelint({ include: './src/**/*.(vue|scss|css)' })
  ]
})
