import { useLocalFontStore } from './stores/LocalFontStore'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown from 'components/Dropdown'
import Dropzone from 'components/Dropzone'
import {
  CleanTmpDir,
  GetLocalFontDirectories,
  InstallLocalFont,
  ListArchiveFiles,
} from 'go/main/App'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import FontList from 'routes/local/components/LocalFontList'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import toast from 'utils/toast'

type ArchiveItem = { path: string; selected: boolean }

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()
  const { getLocalFonts } = useLocalFontStore()

  const [fileSelectIsOpen, setFileSelectIsOpen] = useState<boolean>(false)
  const [archiveFiles, setArchiveFiles] = useState<ArchiveItem[]>([] as ArchiveItem[])
  const [fontDirectories, setFontDirectories] = useState<string[]>([])
  const [destination, setDestination] = useState<any>()

  useEffect(() => {
    GetLocalFontDirectories().then(setFontDirectories)
  }, [])

  const handleArchiveSelection = (archiveItem: ArchiveItem) => {
    setArchiveFiles((prevState) =>
      prevState.map((item) =>
        item.path === archiveItem.path ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  useEffect(() => {
    OnFileDrop(async (__, _, paths) => {
      for (const path of paths) {
        const ext = path.split('.').pop()?.toLowerCase()

        if (ext === 'otf' || ext === 'ttf') {
          await InstallLocalFont(path)

          getLocalFonts()

          toast.success('Font installed successfully.')
        } else if (ext === 'zip' || ext === 'rar' || ext === 'tar' || ext === 'gz') {
          setFileSelectIsOpen(true)

          const fns = await ListArchiveFiles(path)

          const curatedArchiveFiles = fns
            .filter(
              (path) =>
                path.includes('OFL') ||
                path.includes('license') ||
                path.includes('.otf') ||
                path.includes('.ttf') ||
                path.includes('.woff') ||
                path.includes('.woff2'),
            )
            .map((path) => ({
              path,
              selected: true,
            }))

          setArchiveFiles(curatedArchiveFiles)
          if (curatedArchiveFiles.length < 1) {
            toast.error('The archive does not contain font files.')

            setFileSelectIsOpen(false)
          }
        } else {
          toast.error('File format not supported.')
        }
      }
    }, false)

    return () => OnFileDropOff()
  }, [])

  const rootProps = getRootProps()

  const handleDestinationChange = (value: string) => {
    setDestination(value)
  }
  const handleFileSelectClose = () => {
    CleanTmpDir()
    setFileSelectIsOpen(false)
  }
  const handleFileSelectionConfirm = () => {
    setFileSelectIsOpen(false)
    const selectedFilePaths = archiveFiles.filter((f) => f.selected).map((f) => f.path)
    const toastID = toast.loading('Installing font from archive...')
    selectedFilePaths.forEach((path) => {
      toast.loading(`Installing ${path.split('/').pop()}...`, toastID)
      InstallLocalFont(path)
        .then(() => {
          toast.success('Fonts in archive installed successfully.', toastID)
        })
        .catch(() => {
          toast.error(`Could not install font ${path.split('/').pop()}.`)
        })
        .finally(async () => {
          await CleanTmpDir()
          getLocalFonts()
        })
    })
  }

  return (
    <div
      {...rootProps}
      className="h-full"
    >
      <Dialog
        isOpen={fileSelectIsOpen}
        onClose={handleFileSelectClose}
        className="w-200 max-w-200"
      >
        <div className="flex w-full flex-col gap-10">
          <div>
            <h1 className="text-3xl font-bold">Select the fonts to install</h1>
          </div>
          <div className="flex max-h-80 flex-col gap-5 overflow-scroll pr-5">
            {archiveFiles.map((archive) => (
              <label className="flex gap-5">
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
            <Dropdown
              value={destination}
              onChange={handleDestinationChange}
              options={fontDirectories.map((d) => ({ display: d, value: d }))}
              placeholder="destination..."
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-5 pt-10">
          <Button onClick={handleFileSelectClose}>Cancel</Button>
          <Button
            variant="cta"
            onClick={handleFileSelectionConfirm}
          >
            Confirm
          </Button>
        </div>
      </Dialog>

      {isDragActive && (
        <Dropzone>
          <div className="grid h-[50vh] w-[60vw] place-items-center rounded-lg bg-neutral-950 outline-offset-4 outline-neutral-900 outline-dashed">
            <div className="flex flex-col items-center gap-8">
              <Download size={60} />
              <p className="text-xl">Drop fonts in here.</p>
              <div className="flex items-center gap-1">
                <p className="text-md text-neutral-400">Supported extensions:</p>
                <p className="text-md font-bold text-neutral-400">.otf .ttf .zip .rar</p>
              </div>
            </div>
          </div>
        </Dropzone>
      )}
      <div className="col-start-2 flex h-full w-full flex-col overflow-y-auto">
        <FontList />
        <ConfigPanel />
      </div>
    </div>
  )
}

export default Local
