import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: '0.0.0.0', // 允许公网访问
    open: false,     // 禁用自动打开浏览器，防止报错
    proxy: {
      // 当请求以 /api 开头时触发代理
      '/api/api': {
        target: 'http://127.0.0.1:5001', 
        changeOrigin: true,
        // 关键：去掉请求中的 /api 前缀再传给后端
        // 这样前端请求 /api/simulation 会变成后端的 /simulation
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
