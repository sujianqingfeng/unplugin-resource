const URL_PREFIXES = ['/~png/', '~png/', 'virtual:png/', 'virtual/png/']

const resourcePathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

export function isResourcePath(path: string) {
  return resourcePathRE.test(path)
}