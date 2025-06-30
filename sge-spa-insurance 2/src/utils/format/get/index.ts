import { type UnknownRecord } from '@app/utils/interfaces'

type Path = string | Array<string>

function formatPath(path: string | Array<string>) {
  const pathString = Array.isArray(path) ? path.join('.') : path
  return pathString.split('.')
}

interface Get {
  <T = any>(obj: UnknownRecord, path: Path): T | undefined
  <T = any>(obj: UnknownRecord, path: Path, defaultValue: T): T
}

export const get: Get = (obj, path, defaultValue = undefined) => {
  const paths = formatPath(path)
  const result = paths.reduce((prev, curr) => {
    if (!prev) return undefined as unknown as UnknownRecord

    return (prev?.[curr] as UnknownRecord) ?? undefined
  }, obj)

  return result ?? defaultValue
}
