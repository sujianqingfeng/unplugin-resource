import createDebugger from 'debug'
import type { Compiler } from '../../types'

const debug = createDebugger('unplugin-resource')

export const Vue2Compiler = <Compiler>(async (template, collection, resource) => {
  const { compile } = (await import('vue-template-compiler')).default
  const transpile = (await import('vue-template-es2015-compiler')).default

  const { render } = compile(template)

  const toFunction = (code: string): string => {
    return `function () {${code}}`
  }

  let code = transpile(`var __render__ = ${toFunction(render as any)}\n`, {})
  code = code.replace(/\s__(render|staticRenderFns)__\s/g, ' $1 ')

  code += `
/* vite-plugin-components disabled */
export default {
  render: render,
  name: '${collection}-${resource}',
}
`
  return code
})