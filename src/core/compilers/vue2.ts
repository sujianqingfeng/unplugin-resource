import createDebugger from 'debug'
import { Compiler } from '../../types'

const debug = createDebugger('unplugin-resource')

export const Vue2Compiler = <Compiler>(async (template, collection, resource) => {
  debug('vue2 compiler is not implemented yet')
  debugger
 
  return ''
})