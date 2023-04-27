export type Loader = (path: string) => Promise<void>

export type Options = {
  compiler?: 'vue3' | 'vue2'
  customCollections?: Record<string, Loader>
  prefix?: string
}

export type ResolvedOptions = Required<Options>

export type Compiler = (template: string, collection: string, resource: string, options: ResolvedOptions) => string | Promise<string>

export type FileSystemResourceSyncLoaderOptions = {
  // upload url
  url: string
  dir: string
  // file name
  name?: string
  // 额外参数
  extra?: Record<string, any> | ((file: File) => Record<string, any>)
  // 验证函数
  validate?: (res: Record<string, any>) => [boolean, string?]
}