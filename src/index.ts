import { createUnplugin }  from 'unplugin'
import { generateComponentFromPath, isResourcePath, normalizeResourcePath } from './core/loader'
import { resolveOptions } from './core/options'
import type { Options } from './types'

const unplugin = createUnplugin<Options | undefined>((options = {}) => {

  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-resource',
    enforce: 'pre',
    resolveId(id) {
      if (isResourcePath(id)) {
        const res = normalizeResourcePath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')
        console.log('resolveId', res)
        return res
      }
      return null
    },
    loadInclude(id) {
      return isResourcePath(id)
    },
    async load(id) {
      console.log('load', id)
      const code = await generateComponentFromPath(id, resolved)
      if (code) {
        return {
          code,
          map: { version: 3, mappings: '', sources: [] } as any,
        }
      }
    },
  }
})

export default unplugin