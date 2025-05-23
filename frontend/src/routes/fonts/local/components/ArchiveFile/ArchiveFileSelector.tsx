import ArchiveFolderStructure from './ArchiveFolderStructure'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown from 'components/Dropdown'
import { GetLocalFontDirectories, CopyArchiveContents } from 'go/main/App'
import { sources } from 'go/models'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useState, useEffect, ComponentProps } from 'react'
import { FileNode, FolderNode, getAllFilesFromFolder } from 'utils/fs'
import toast from 'utils/toast'

interface FontFileSelectorProps {
  isOpen: boolean
  onClose: () => void
  fileStructure: FolderNode
  onSuccess: () => void
  archivePath: string
}

const FontFileSelector = ({
  isOpen,
  onClose,
  fileStructure,
  archivePath,
  onSuccess,
}: FontFileSelectorProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileNode[]>([])
  const [fontDirectories, setFontDirectories] = useState<sources.Source[]>([])
  const [destination, setDestination] = useState<string>('')
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)

  useEffect(() => {
    GetLocalFontDirectories().then((fds) => setFontDirectories(fds))
  }, [fileStructure])

  useEffect(() => {
    if (fileStructure) {
      const allFiles = getAllFilesFromFolder(fileStructure)
      setIsSelectAllChecked(
        selectedFiles.length > 0 && allFiles.length > 0 && selectedFiles.length === allFiles.length,
      )
    } else {
      setIsSelectAllChecked(false)
      setSelectedFiles([])
    }
  }, [selectedFiles, fileStructure])

  const handleDestinationChange = (value: string) => {
    setDestination(value)
  }

  const handleFileSelect = (file: FileNode) => {
    const fileIndex = selectedFiles.findIndex((f) => f.fullpath === file.fullpath)
    if (fileIndex > -1) {
      const newSelectedFiles = [...selectedFiles]
      newSelectedFiles.splice(fileIndex, 1)
      setSelectedFiles(newSelectedFiles)
    } else {
      setSelectedFiles([...selectedFiles, file])
    }
  }

  const handleFolderSelect = (folder: FolderNode) => {
    const allFilesInFolder = getAllFilesFromFolder(folder)
    const allFilesInFolderPaths = allFilesInFolder.map((f) => f.fullpath)
    const currentlySelectedInFolder = selectedFiles.filter((file) =>
      allFilesInFolderPaths.includes(file.fullpath),
    )
    const allAreSelected = currentlySelectedInFolder.length === allFilesInFolder.length

    if (allAreSelected) {
      setSelectedFiles(
        selectedFiles.filter((file) => !allFilesInFolderPaths.includes(file.fullpath)),
      )
    } else {
      const newSelectedFiles = [...selectedFiles]
      allFilesInFolder.forEach((file) => {
        if (!newSelectedFiles.some((selectedFile) => selectedFile.fullpath === file.fullpath)) {
          newSelectedFiles.push(file)
        }
      })
      setSelectedFiles(newSelectedFiles)
    }
  }

  const handleSelectAllChange = (checked: boolean) => {
    setIsSelectAllChecked(checked)
    if (fileStructure) {
      const allFiles = getAllFilesFromFolder(fileStructure)
      if (checked) {
        setSelectedFiles(allFiles)
      } else {
        setSelectedFiles([])
      }
    }
  }

  const handleClose = () => {
    setDestination('')
    setSelectedFiles([])
    onClose()
  }

  const handleConfirm = () => {
    setDestination('')
    setSelectedFiles([])
    onClose()

    const toastID = toast.loading('Installing fonts from archive...')
    CopyArchiveContents(
      archivePath,
      selectedFiles.map((sf) => sf.fullpath),
      destination,
    )
      .then(() => {
        toast.success('Fonts from archive installed succesfully.', toastID)
      })
      .catch((error) => {
        toast.error(
          <>
            Fonts from archive could not be installed. Click
            <button
              className="underline"
              onClick={() => navigator.clipboard.writeText(error)}
            >
              here
            </button>
            to copy the the error to your clipboard.
          </>,
          toastID,
        )
      })

    onSuccess()
    setDestination('')
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      className={'w-200 max-w-200'}
    >
      <div className="flex w-full flex-col gap-5">
        <h1 className="text-3xl font-medium">Select the font files you wish to install</h1>
        <ArchiveFolderStructure
          onFolderSelect={handleFolderSelect}
          fileStructure={fileStructure}
          onFileSelect={handleFileSelect}
          selectedFiles={selectedFiles}
        />
        <div className="flex gap-2">
          <Checkbox
            checked={isSelectAllChecked}
            onCheckedChange={handleSelectAllChange}
          />
          <p className="">Select all</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Destination path</p>
          <Dropdown
            value={destination}
            onChange={handleDestinationChange}
            options={fontDirectories.map((d) => ({
              display: d.name,
              value: d.path,
              icon: d.icon as ComponentProps<typeof DynamicIcon>['name'],
              disabled: d.dir_readonly,
            }))}
            placeholder="destination"
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-5 pt-10">
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="cta"
          onClick={handleConfirm}
          disabled={selectedFiles.length === 0 || destination.trim() === ''}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}

export default FontFileSelector
