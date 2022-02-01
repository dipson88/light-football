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
    },
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ],
    preserveSymlinks: true
  },
  plugins: [
    vuePlugin(),
    eslintPlugin(),
    viteStylelintPlugin()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "/src/styles/helpers/index.scss";'
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
