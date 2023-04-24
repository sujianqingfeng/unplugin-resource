export interface ComponentsResolverOptions {
  customCollections?: string[]
  prefix?: string
} 

/**
 * Convert camelCase string to kebab-case
 */
function camelToKebab(key: string): string {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

export default function ComponentsResolver(options: ComponentsResolverOptions = {}) {
  const { 
    prefix: rawPrefix  = 'resource',
    customCollections = []
  } = options

  return (name: string) => {
    const kebab = camelToKebab(name)
    const prefix = `${rawPrefix}-`
    if (!kebab.startsWith(prefix)) {
      return 
    }

    const slice = kebab.slice(prefix.length)
    const collection = customCollections.find(c => slice.startsWith(`${c}-`))
    if (!collection) {
      return
    }
    let icon = slice.slice(collection.length)
    if (icon[0] === '-') { 
      icon = icon.slice(1)
    }
    icon = icon.replace(/-/g, '/')
    return `~resource/${collection}/${icon}`
  }
}