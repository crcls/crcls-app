import { join } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import pkg from '../../package.json'
import sassDts from 'vite-plugin-sass-dts'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import solidSvg from 'vite-plugin-solid-svg'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [
    sassDts(),
    eslintPlugin(),
    solidPlugin(),
    solidSvg({
      defaultAsComponent: true,
    }),
  ],
  base: './',
  build: {
    target: 'esnext',
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    port: pkg.env.PORT,
  },
})
