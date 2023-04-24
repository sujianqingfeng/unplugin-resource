import Resource from '@sujian/unplugin-resource/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Resource({
      prefix: 'https://static001.infoq.cn/resource/image/00/7b/'
    })
  ],
})
