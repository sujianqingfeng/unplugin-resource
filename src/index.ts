import createDebugger from 'debug'
import { createUnplugin }  from 'unplugin'
import { generateComponentFromPath, isResourcePath, normalizeResourcePath, resourceSync } from './core/loader'
import { resolveOptions } from './core/options'
import type { Options } from './types'

const debug = createDebugger('unplugin-resource')

const unplugin = createUnplugin<Options | undefined>((options = {}) => {

  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-resource',
    enforce: 'pre',
    async resolveId(id) {
      if (isResourcePath(id)) {
        const res = normalizeResourcePath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')

        debug('resolveId', id)
        await resourceSync(id, resolved)
        return res
      }
      return null
    },
    loadInclude(id) {
      return isResourcePath(id)
    },
    async load(id) {
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