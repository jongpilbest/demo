import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // vite.config.ts에 추가 (기존 plugins 아래에)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',  // 백엔드 포트
        changeOrigin: true,
      },
    },
  },
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
