import { join } from 'path'
import { pathExists, unlink, readFile } from 'fs-extra'
import fetch, { FormData, File } from 'node-fetch'
import type { FileSystemResourceSyncLoaderOptions, Loader } from './types'

async function generateFileFromPath(path: string) {
  const buffer = await readFile(path)
  const file = new File([buffer], path)
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
  appendToFormData(formData, extra)
  return formData
}

async function removeResourceFromPath(path: string) {
  await unlink(path)
}

async function uploadFile(formData: FormData, options: FileSystemResourceSyncLoaderOptions): Promise<boolean> {
  const { url, validate } = options
  const result = await fetch(url, { method: 'POST', body: formData })
  if (result.ok) {
    if (validate) {
      return  validate(result.json())
    }
    return true
  }
  return false
}

export function FileSystemResourceSyncLoader(options: FileSystemResourceSyncLoaderOptions): Loader {
  const pwd = process.cwd()
  const { dir } = options

  return async (path) => {
    const p = join(pwd, dir, path) 
    console.log(
      p, 'p---'
    )
    const isExist = await pathExists(p)
    if (!isExist) {
      return 
    }
    const formData = await generateFormData(p, options)
    const isOk = await uploadFile(formData, options)
    if (isOk) {
      removeResourceFromPath(p)
    }
  }
}