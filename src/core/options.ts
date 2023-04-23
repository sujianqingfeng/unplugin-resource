import type { Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options): ResolvedOptions  {
  const {
    compiler = 'vue',
    customCollections = {}
  } = options

  return {
    compiler,
    customCollections
  } 
}