const path = require('path')
const { FileSystemResourceSyncLoader } = require('unplugin-resource/loaders')
const Resource = require('unplugin-resource/webpack').default
const UnoCSS = require('@unocss/webpack').default
const dotenv = require('dotenv')
const { presetAttributify, presetUno } = require('unocss')
const Components = require('unplugin-vue-components/webpack')
const ResourceResolver = require('unplugin-resource/resolver').default

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [
          ResourceResolver({
            customCollections: ['custom']
          })
        ],
      }),
      Resource({
        compiler: 'vue2',
        prefix: process.env.RESOURCE_PREFIX,
        customCollections: {
          'custom': FileSystemResourceSyncLoader({
            dir: '/src/assets/images',
            url: process.env.RESOURCE_UPLOAD_URL,
            extra(file) {
              return {
                group: process.env.RESOURCE_UPLOAD_GROUP,
                name: file.name,
              }
            },
            validate: (res) => {
              if (res.code === 0) {
                return [true, res.data]
              }
              return [false]
            }
          })
        }
      }),
      UnoCSS({
        presets: [
          presetUno(), 
          presetAttributify(),
        ],
      }),
    ]
  },
  chainWebpack(config) {
    // disable type check and let `vue-tsc` handles it
    config.plugins.delete('fork-ts-checker')

    // disable cache for testing, you should remove this in production
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('js').uses.delete('cache-loader')
    config.module.rule('ts').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
  },
}