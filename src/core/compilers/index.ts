import { Vue3Compiler } from './vue3'
import { Compiler, ResolvedOptions } from '../../types'

export const compilers: Record<ResolvedOptions['compiler'], Compiler> = {
  vue3: Vue3Compiler,
}

