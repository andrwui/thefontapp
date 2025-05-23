export interface FileNode {
  name: string
  fullpath: string
}
export interface FolderNode {
  name: string
  fullpath: string
  folders: FolderNode[]
  files: FileNode[]
}

export const createArchiveFileStructure = (paths: string[]): FolderNode => {
  const root: FolderNode = {
    name: '/',
    fullpath: '/',
    folders: [],
    files: [],
  }

  paths.forEach((path: string) => {
    path = path.trim().replace(/^["']|["']$/g, '')

    const parts: string[] = path.split('/').filter((part) => part !== '')

    let currentLevel: FolderNode = root
    let currentFullPath = ''

    for (let i = 0; i < parts.length - 1; i++) {
      const folderName: string = parts[i]
      const folderPath = currentFullPath ? `${currentFullPath}/${folderName}` : folderName

      let folder = currentLevel.folders.find((f: FolderNode) => f.name === folderName)

      if (!folder) {
        folder = {
          name: folderName,
          fullpath: folderPath,
          folders: [],
          files: [],
        }
        currentLevel.folders.push(folder)
      }

      currentLevel = folder
      currentFullPath = folderPath
    }

    if (parts.length > 0) {
      const fileName: string = parts[parts.length - 1]
      const fullFilePath = currentFullPath ? `${currentFullPath}/${fileName}` : fileName

      if (!currentLevel.files.some((file) => file.name === fileName)) {
        currentLevel.files.push({
          name: fileName,
          fullpath: fullFilePath,
        })
      }
    }
  })

  return root
}
export const getAllFilesFromFolder = (folder: FolderNode): FileNode[] => {
  let files: FileNode[] = [...folder.files]
  folder.folders.forEach((subFolder) => {
    files = [...files, ...getAllFilesFromFolder(subFolder)]
  })
  return files
}
