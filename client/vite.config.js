import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
      "api": "https://the-news-e1gaogc66-wajahat-alis-projects.vercel.app/",
    },
})
