import { createUnplugin }  from 'unplugin'
import { isResourcePath, normalizeResourcePath } from './core/loader'
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
        console.log('res', res)
        return ''
      }
    }
  }
})

export default unplugin