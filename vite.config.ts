import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pagesのリポジトリ名を指定
const repoName = 'chrome-extension-react-template'

export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? `/${repoName}/` : './',
  plugins: [
    react(),
  ],
  build: {
    outDir: mode === 'github' ? 'docs' : 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
}));