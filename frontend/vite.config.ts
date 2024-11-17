import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [tsconfigPaths(), svgr(), react()],
  resolve: {
    alias: {
      go: path.resolve(__dirname, 'wailsjs/go'),

      runtime: path.resolve(__dirname, 'wailsjs/runtime'),
    },
  },
})
