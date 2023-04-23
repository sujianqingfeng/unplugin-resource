const URL_PREFIXES = ['/~resource/', '~resource/', 'virtual:resource/', 'virtual/resource/']

const resourcePathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

export function isResourcePath(path: string) {
  return resourcePathRE.test(path)
}

export function normalizeResourcePath(path: string) {
  return path.replace(resourcePathRE, URL_PREFIXES[0])
}