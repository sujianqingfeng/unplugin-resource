import { createUnplugin }  from 'unplugin'
import { isResourcePath } from './core/loader'
import { resolveOptions } from './core/options'
import type { Options } from './types'

const unplugin = createUnplugin<Options | undefined>((options = {}) => {

  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-resource',
    enforce: 'pre',
    resolveId(id) {
      if (isResourcePath(id)) {

      }
    }
  }
})

export default unplugin