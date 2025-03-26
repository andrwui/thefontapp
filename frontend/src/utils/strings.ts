export const toSnakeCase = (str: string): string => {
  return str
    .replace(/[A-Z]/g, (match) => ` ${match}`)
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export const getFileExtension = (path: string): string | undefined => {
  const ext = path.split('.').pop()
  if (!ext) return

  return ext.toLowerCase()
}

export const getFileNameFromCompletePath = (path: string): string | undefined => {
  return path.split('/').pop()
}
