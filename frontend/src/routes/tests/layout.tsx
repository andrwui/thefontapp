import Button from 'components/Button'
import { useState } from 'react'
import ArchiveFolderStructure from 'routes/local/components/ArchiveFile/ArchiveFolderStructure'
import { createArchiveFileStructure, FileNode } from 'utils/fs'
import toast from 'utils/toast'

const Tests = () => {
  const handleTestToastButtonClick = () => {
    console.log('hola')
    toast.success('Font family deleted successfully.')
  }

  const filePaths = [
    'Delight/Web-TT/Delight-Regular.ttf',
    'Delight/OpenType-PS/Delight-ExtraLight.otf',
    'Delight/OpenType-PS/Delight-SemiBold.otf',
  ]

  const fileStructure = createArchiveFileStructure(filePaths)

  const [selectedFiles, setSelectedFiles] = useState<FileNode[]>([
    { fullpath: 'Delight/Web-TT/Delight-Regular.ttf', name: 'Delight-Regular.ttf' },
  ])

  const handleFileSelect = (file: FileNode) => {
    const fileIndex = selectedFiles.indexOf(file)
    if (fileIndex > -1) {
      const newSelectedFiles = [...selectedFiles]
      newSelectedFiles.splice(fileIndex, 1)
      setSelectedFiles(newSelectedFiles)
    } else {
      setSelectedFiles([...selectedFiles, file])
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <Button onClick={handleTestToastButtonClick}>Generate check toast</Button>
      <ArchiveFolderStructure
        onFolderSelect={() => console.log}
        fileStructure={fileStructure}
        selectedFiles={selectedFiles}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}

export default Tests
