import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    }
  }
})
