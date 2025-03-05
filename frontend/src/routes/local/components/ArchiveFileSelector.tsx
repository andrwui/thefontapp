import { ArchiveItem } from '../types'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown from 'components/Dropdown'
import { InstallLocalFont, CleanTmpDir, GetLocalFontDirectories } from 'go/main/App'
import { useState, useEffect } from 'react'
import toast from 'utils/toast'

interface FontFileSelectorProps {
  isOpen: boolean
  onClose: () => void
  archiveFiles: ArchiveItem[]
  onSuccess: () => void
}

const FontFileSelector = ({
  isOpen,
  onClose,
  archiveFiles: initialArchiveFiles,
  onSuccess,
}: FontFileSelectorProps) => {
  const [archiveFiles, setArchiveFiles] = useState<ArchiveItem[]>(initialArchiveFiles)
  const [fontDirectories, setFontDirectories] = useState<string[]>([])
  const [destination, setDestination] = useState<string>('/')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    GetLocalFontDirectories()
      .then((fds) => fds.filter((fd) => fd.startsWith('~/')))
      .then((fdirs) => setFontDirectories(fdirs))
    setDestination('/')
  }, [])

  useEffect(() => {
    setArchiveFiles(initialArchiveFiles)
  }, [initialArchiveFiles])

  const handleArchiveSelection = (archiveItem: ArchiveItem) => {
    setArchiveFiles((prevState) =>
      prevState.map((item) =>
        item.path === archiveItem.path ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  const handleDestinationChange = (value: string) => {
    setDestination(value)
  }

  const handleClose = () => {
    CleanTmpDir()
    setError('')
    setDestination('')

    onClose()
  }

  const handleConfirm = () => {
    onClose()

    const selectedFilePaths = archiveFiles.filter((f) => f.selected).map((f) => f.path)
    const toastID = toast.loading('Installing font from archive...')

    selectedFilePaths.forEach((path) => {
      toast.loading(`Installing ${path.split('/').pop()}...`, toastID)
      InstallLocalFont(path, destination)
        .then(() => {
          toast.success('Fonts in archive installed successfully.', toastID)
        })
        .catch(() => {
          toast.error(`Could not install font ${path.split('/').pop()}.`)
          toast.error(`Could not install fonts from archive.`, toastID)
        })
        .finally(async () => {
          await CleanTmpDir()
          onSuccess()
          setError('')
          setDestination('')
        })
    })
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      className={'w-200 max-w-200'}
    >
      <div className="flex w-full flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold">Select the fonts to install</h1>
        </div>
        <div className="flex max-h-80 flex-col gap-5 overflow-scroll pr-5">
          {archiveFiles.map((archive) => (
            <label
              key={archive.path}
              className="flex gap-5"
            >
              <Checkbox
                checked={archive.selected}
                onCheckedChange={() => handleArchiveSelection(archive)}
              />
              <p>{archive.path.split('/').pop()}</p>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p>Destination path</p>
          {error && <p>{error}</p>}
          <Dropdown
            value={destination}
            onChange={handleDestinationChange}
            options={fontDirectories.map((d) => ({ display: d, value: d }))}
            placeholder="destination..."
            hasError={!(error.trim() === '')}
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-5 pt-10">
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="cta"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}

export default FontFileSelector
