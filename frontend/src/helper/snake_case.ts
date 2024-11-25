export const toSnakeCase = (str: string) => {
  return str
    .replace(/[A-Z]/g, match => ` ${match}`)
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/^_+|_+$/g, '')
}
