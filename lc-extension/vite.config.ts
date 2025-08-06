import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// @types/node gives TypeScript knowledge of path, __dirname, etc.

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'background') return `background/background.js`
          if (chunk.name === 'content') return `content/content.js`
          return `[name]/index.js`
        },
      },
    },
    outDir: 'dist',
  },
})
