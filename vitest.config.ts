import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['packages/**/tests/**/*.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/submodules/**',
    ],
    globals: true,
    environment: 'node',
    testTimeout: 20000,
    coverage: {
      enabled: false,
      reporter: ['html'],
    },
  },
})
