import path from 'path'
import { FileSystemResourceSyncLoader } from '@sujian/unplugin-resource/loaders'
import ResourceResolver from '@sujian/unplugin-resource/resolver'
import Resource from '@sujian/unplugin-resource/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    UnoCSS({
      presets: [
        presetUno(), 
        presetAttributify(),
      ],
    }),
    Components({
      resolvers: [
        ResourceResolver({
          customCollections: ['custom']
        })
      ],
      dts: 'types/components.d.ts'
    }),
    Resource({
      prefix: process.env.RESOURCE_PREFIX,
      customCollections: {
        'custom': FileSystemResourceSyncLoader({
          dir: '/src/assets/images',
          url: process.env.RESOURCE_UPLOAD_URL as string,
          extra(file) {
            return {
              group: process.env.RESOURCE_UPLOAD_GROUP,
              name: file.name,
            }
          },
          validate: (res) => {
            if (res.code === 0) {
              return [true, res.data as string]
            }
            return [false]
          }
        })
      }
    })
  ],
})
