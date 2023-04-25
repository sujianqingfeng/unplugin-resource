const path = require('path')
const { FileSystemResourceSyncLoader } = require('@sujian/unplugin-resource/loaders')
const Resource = require('@sujian/unplugin-resource/webpack').default
const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      Resource({
        compiler:'vue2',
        prefix: process.env.RESOURCE_PREFIX,
      })
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
})