export type Loader = (path: string) => Promise<void>

export type Options = {
  compiler?: 'vue3' | 'vue2'
  customCollections?: Record<string, Loader>
  prefix?: string
}

export type ResolvedOptions = Required<Options>

export type Compiler = (template: string, collection: string, resource: string, options: ResolvedOptions) => string | Promise<string>

export type FileSystemResourceSyncLoaderOptions = {
  url: string
  dir: string
  name?: string
  extra?: Record<string, any> | ((file: File) => Record<string, any>)
  validate?: (res: Record<string, any>) => [boolean, string?]
}