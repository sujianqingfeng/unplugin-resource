import axios from 'axios'
import { compilers } from './compilers'
import { ResolvedOptions } from '../types'

const URL_PREFIXES = ['/~resource/', '~resource/', 'virtual:resource/', 'virtual/resource/']
const RESOURCE_SUFFIXES = ['/(png)$']

const resourcePathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)
const realResourcePathRE = new RegExp(`${RESOURCE_SUFFIXES.map(v => `${v}`).join('|')}`)

export function isRealResourcePath(path: string) {
  return realResourcePathRE.test(path)
}

export function normalizeRealResourcePath(path: string) {
  return path.replace(realResourcePathRE, (match, p1) => {
    return `.${p1}`
  })
}

export function isResourcePath(path: string) {
  return resourcePathRE.test(path)
}

export function normalizeResourcePath(path: string) {
  return path.replace(resourcePathRE, URL_PREFIXES[0])
}

export function resolveResourcePath(path: string) {
  if (!isResourcePath(path)) {
    return null
  }
  path = path.replace(resourcePathRE, '')
  path = path.replace(/\.\w+$/, '')
  
  const [collection, ...resource] = path.split('/')

  return {
    collection,
    resource: resource.join('/'),
  }
}

function loadResourceTemplate(resource: string, prefix: string) {
  if (isRealResourcePath(resource)) {
    resource = normalizeRealResourcePath(resource)
  } else {
    resource += '.png'
  }
  return `<img src="${prefix}${resource}" />`
}

export function generateComponentFromPath(path: string, options: ResolvedOptions) {
  const { collection, resource } = resolveResourcePath(path)!
  const { compiler: _compiler, prefix } = options

  const template = loadResourceTemplate(resource, prefix) 

  if (_compiler) {
    const compiler = compilers[_compiler]
    if (compiler) {
      return compiler(template, collection, resource, options)
    }
  }
}

export async function resourceSync(path: string, options: ResolvedOptions) {
  const resolved = resolveResourcePath(path)
  if (!resolved) {
    return
  }
  const { collection, resource } = resolved
  const loader = options.customCollections[collection]
  if (loader) {
    const path = normalizeRealResourcePath(resource)
    await loader(path)
  }
}
