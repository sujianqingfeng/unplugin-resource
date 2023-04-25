import { test, expect, describe } from 'vitest'
import { normalizeRealResourcePath, isRealResourcePath, resolveResourcePath } from '../src/core/loader'

describe ('loader', () => {
  test('normalizeRealResourcePath', () => {
    const str = 'fffff/test/png'
    const result = normalizeRealResourcePath(str)
  
    expect(result).toMatchInlineSnapshot('"fffff/test.png"')
  })

  test('isRealResourcePath', () => {
    const is = isRealResourcePath('/custom/xxx/png')
    expect(is).toBeTruthy()
  })

  test('resolveResourcePath', () => {
    const result = resolveResourcePath('~resource/custom/xxxx/png') 
    expect(result).toMatchInlineSnapshot(`
      {
        "collection": "custom",
        "resource": "xxxx/png",
      }
    `)
  })
})

