export interface Options {
  compiler?: 'vue'
  customCollections?: Record<string, any>
}

export type ResolvedOptions = Required<Options>