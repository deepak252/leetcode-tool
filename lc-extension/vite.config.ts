import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.config'

// @types/node gives TypeScript knowledge of path, __dirname, etc.

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: 'popup.html',
        options: 'options.html',
      },
    },
  },
})
