import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown from 'components/Dropdown'
import { InstallLocalFont, GetLocalFontDirectories } from 'go/main/App'
import { useState, useEffect } from 'react'
import { getFileNameFromCompletePath } from 'utils/strings'
import toast from 'utils/toast'

type ArchiveFile = {
  path: string
  selected: boolean
}

interface FontFileSelectorProps {
  isOpen: boolean
  onClose: () => void
  archiveFilenames: string[]
  onSuccess: () => void
}

const FontFileSelector = ({
  isOpen,
  onClose,
  archiveFilenames,
  onSuccess,
}: FontFileSelectorProps) => {
  const [archiveFiles, setArchiveFiles] = useState<ArchiveFile[]>([])
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
    if (archiveFilenames) {
      setArchiveFiles(archiveFilenames.map((af) => ({ path: af, selected: true })))
    }
  }, [archiveFilenames])

  const handleArchiveSelection = (archiveFile: ArchiveFile) => {
    setArchiveFiles((prevState) =>
      prevState.map((item) =>
        item.path === archiveFile.path ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  const handleDestinationChange = (value: string) => {
    setDestination(value)
  }

  const handleClose = () => {
    setError('')
    setDestination('')
    onClose()
  }

  const handleConfirm = () => {
    onClose()

    const selectedFilePaths = archiveFiles.filter((f) => f.selected).map((f) => f.path)
    const toastID = toast.loading('Installing fonts from archive...')

    selectedFilePaths.forEach((path) => {
      const fileName = getFileNameFromCompletePath(path)

      toast.loading(`Installing ${fileName}...`, toastID)

      InstallLocalFont(path, destination)
        .then(() => {
          toast.success(`Font ${fileName} installed successfully.`, toastID)
        })
        .catch(() => {
          toast.error(`Could not install font ${fileName}.`)
        })
    })

    onSuccess()
    setError('')
    setDestination('')
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
