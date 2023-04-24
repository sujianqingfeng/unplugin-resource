import { Compiler } from '../../types'

export const Vue3Compiler = <Compiler>(async (template, collection, resource) => {
  
  const { compileTemplate } = await import('@vue/compiler-sfc')
  let { code } = compileTemplate({
    source: template,
    id: `${collection}:${resource}`,
    filename: `${collection}-${resource}.vue`
  }) 

  code = code.replace(/^export /gm, '')
  code += `\n\nexport default { name: '${collection}-${resource}', render }`
  code += '\n/* vite-plugin-components disabled */'
  return code
})