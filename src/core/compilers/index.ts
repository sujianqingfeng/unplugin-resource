import { Vue3Compiler } from './vue3'
import { Compiler, ResolvedOptions } from '../../types'
import { Vue2Compiler } from './vue2'

export const compilers: Record<ResolvedOptions['compiler'], Compiler> = {
  vue3: Vue3Compiler,
  vue2: Vue2Compiler,
}

