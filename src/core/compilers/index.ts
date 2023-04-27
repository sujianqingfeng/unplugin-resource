import { Vue2Compiler } from './vue2'
import { Vue3Compiler } from './vue3'
import type { Compiler, ResolvedOptions } from '../../types'

export const compilers: Record<ResolvedOptions['compiler'], Compiler> = {
  vue3: Vue3Compiler,
  vue2: Vue2Compiler,
}

