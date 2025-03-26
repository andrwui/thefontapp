export const curateArchiveFiles = (paths: string[]): string[] => {
  return paths.filter(
    (path) =>
      path.toLowerCase().includes('ofL') ||
      path.toLowerCase().includes('license') ||
      path.includes('.otf') ||
      path.includes('.ttf'),
  )
}

type FolderNode = {
  path: string
  folders: FolderNode[]
  files: string[]
}

export const createArchiveFileStructure = (paths: string[]): FolderNode => {
  const root: FolderNode = {
    path: '',
    folders: [],
    files: [],
  }

  paths.forEach((path: string) => {
    path = path.trim().replace(/^["']|["']$/g, '')

    const parts: string[] = path.split('/').filter((part) => part !== '')

    let currentLevel: FolderNode = root

    for (let i = 0; i < parts.length - 1; i++) {
      const folderName: string = parts[i]

      let folder = currentLevel.folders.find((f: FolderNode) => f.path === folderName)

      if (!folder) {
        folder = {
          path: folderName,
          folders: [],
          files: [],
        }
        currentLevel.folders.push(folder)
      }

      currentLevel = folder
    }

    if (parts.length > 0) {
      const fileName: string = parts[parts.length - 1]

      if (!currentLevel.files.includes(fileName)) {
        currentLevel.files.push(fileName)
      }
    }
  })

  return root
}
