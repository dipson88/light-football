import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteStylelintPlugin from '@amatlash/vite-plugin-stylelint'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8001/',
        changeOrigin: true
      }
    }
  },
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
    viteStylelintPlugin(),
    vueI18n({
      fullInstall: false
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "/src/styles/index.scss";'
      }
    }
  },
  build: {
    outDir: '../Web/dist/public',
    emptyOutDir: true
  }
})
