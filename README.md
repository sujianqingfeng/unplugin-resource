# unplugin-resource



## Support bundler

- vite
- webpack

## Install

```
npm i unplugin-resource -D
```

### vite

```ts
import Resource from 'unplugin-resource/vite'
import { FileSystemResourceSyncLoader } from 'unplugin-resource/loaders'
import ResourceResolver from 'unplugin-resource/resolver'


export default defineConfig({
  plugins:[
    Components({
      resolvers: [
        ResourceResolver({
          customCollections: ['custom']
        })
      ],
      dts: 'types/components.d.ts'
    }),
    Resource({
      prefix: 'basic-prefix',
      customCollections: {
        'custom': FileSystemResourceSyncLoader({
          dir: '/src/assets/images',
          url: 'upload url',
          extra(file) {
            return {
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
  ]
})
```

### webpack

```js
const { FileSystemResourceSyncLoader } = require('unplugin-resource/loaders')
const Resource = require('unplugin-resource/webpack').default
const ResourceResolver = require('unplugin-resource/resolver').default


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
        customCollections: {
        'custom': FileSystemResourceSyncLoader({
          dir: '/src/assets/images',
          url: 'upload url',
          extra(file) {
            return {
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
    ]
  },
}
```
