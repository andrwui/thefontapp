export const curateArchivePaths = (paths: string[]): string[] => {
  return paths.filter((path) => {
    const lcPath = path.toLowerCase()

    return (
      !lcPath.includes('.ds_store') &&
      !lcPath.includes('__macosx') &&
      (lcPath.includes('.otf') || lcPath.includes('.ttf'))
    )
  })
}
