import { join, basename } from 'path'
import createDebugger from 'debug'
import { pathExists, unlink, readFile } from 'fs-extra'
import fetch, { FormData, File } from 'node-fetch'
import { createTryWrapper } from './core/utils'
import type { FileSystemResourceSyncLoaderOptions, Loader } from './types'

const debug = createDebugger('unplugin-resource')

async function generateFileFromPath(path: string) {
  const buffer = await readFile(path)
  const file = new File([buffer], basename(path))
  return file
}

function appendToFormData(formData: FormData, data: Record<string, any>) {
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
}

async function generateFormData(path: string, options: FileSystemResourceSyncLoaderOptions) {
  const { name = 'file', extra = {} } = options
  const formData = new FormData()
  const file = await generateFileFromPath(path) 
  formData.append(name, file)
  appendToFormData(formData, typeof extra === 'function' ? extra(file) : extra)
  return formData
}

async function removeResourceFromPath(path: string) {
  await unlink(path)
}

async function uploadFile(formData: FormData, options: FileSystemResourceSyncLoaderOptions): Promise<[boolean, string?]> {
  const { url, validate } = options
  if (!url) {
    return [false]
  }
  debug('uploading file')
  const tryFetch = createTryWrapper(fetch)
  const [isOk, result] = await tryFetch(url, { method: 'POST', body: formData })
  if (!isOk) {
    debug('upload file failed', result)
    return [false]
  }
  if (result.ok) {
    if (validate) {
      const json = await result.json() 
      return validate(json as Record<string, any>)
    }
    return [true]
  }
  return [false]
}

export function FileSystemResourceSyncLoader(options: FileSystemResourceSyncLoaderOptions): Loader {
  const pwd = process.cwd()
  const { dir } = options

  return async (path) => {
    const p = join(pwd, dir, path) 
    debug(`local path: ${p}`)
    const isExist = await pathExists(p)
    if (!isExist) {
      return 
    }
    debug('generateFormData')
    const formData = await generateFormData(p, options)
    const [isOk, url] = await uploadFile(formData, options)
    if (isOk) {
      debug('upload file success: url:', url)
      removeResourceFromPath(p)
    }
  }
}