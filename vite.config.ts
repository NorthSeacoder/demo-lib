/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: { react: 'React' },
      }
    },
  },
  resolve:{
    alias:{
      '@': resolve(__dirname, 'src'),
    }
  },

  plugins: [
    react(),
    dts({ rollupTypes: true }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      all: false,
      enabled: false,
    },
  },
})
