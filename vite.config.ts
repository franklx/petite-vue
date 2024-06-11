import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  esbuild: {
    minify: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PetiteVue',
      formats: ['es', 'umd', 'iife']
    },
  }
})
// vim: set ts=8 sts=2 sw=2 et sta :
