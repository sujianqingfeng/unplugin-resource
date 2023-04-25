import type { Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options): ResolvedOptions  {
  const {
    compiler = 'vue3',
    customCollections = {},
    prefix = ''
  } = options

  return {
    compiler,
    customCollections,
    prefix
  } 
}