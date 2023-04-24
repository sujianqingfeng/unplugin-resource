import { FileSystemResourceSyncLoader } from '@sujian/unplugin-resource/loaders'
import ResourceResolver from '@sujian/unplugin-resource/resolver'
import Resource from '@sujian/unplugin-resource/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      resolvers: [
        ResourceResolver({
          customCollections: ['custom']
        })
      ],
      dts: 'types/components.d.ts'
    }),
    UnoCSS({
      presets: [
        presetUno(), 
        presetAttributify(),
      ],
    }),
    Resource({
      prefix: 'https://masteringjs.io/assets/images/vue/',
      customCollections: {
        'custom': FileSystemResourceSyncLoader({
          dir: '/src/assets/images',
          url: ''
        })
      }
    })
  ],
})
