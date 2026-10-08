import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    // Bound JSDOM worker memory on developer machines and CI.
    maxWorkers: 2,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
