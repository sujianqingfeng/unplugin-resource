export type Options = {
  compiler?: 'vue3'
  customCollections?: Record<string, any>
  prefix?: string
}

export type ResolvedOptions = Required<Options>

export type Compiler = (template: string, collection: string, resource: string, options: ResolvedOptions) => string | Promise<string>