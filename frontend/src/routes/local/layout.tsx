import FontFileSelector from './components/ArchiveFileSelector'
import { useLocalFontStore } from './stores/LocalFontStore'
import { ArchiveItem } from './types'
import Dropzone from 'components/Dropzone'
import { ListArchiveFiles, InstallLocalFont } from 'go/main/App'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import FontList from 'routes/local/components/LocalFontList'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import toast from 'utils/toast'

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()
  const { getLocalFonts } = useLocalFontStore()

  const [fileSelectIsOpen, setFileSelectIsOpen] = useState<boolean>(false)
  const [archiveFiles, setArchiveFiles] = useState<ArchiveItem[]>([])

  useEffect(() => {
    getLocalFonts()
  }, [])

  useEffect(() => {
    OnFileDrop(async (__, _, paths) => {
      for (const path of paths) {
        const ext = path.split('.').pop()?.toLowerCase()

        if (ext === 'otf' || ext === 'ttf') {
          await InstallLocalFont(path, '/usr/share/fonts/')
          getLocalFonts()
          toast.success('Font installed successfully.')
        } else if (ext === 'zip' || ext === 'rar' || ext === 'tar' || ext === 'gz') {
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

          if (curatedArchiveFiles.length < 1) {
            toast.error('The archive does not contain font files.')
            return
          }

          setArchiveFiles(curatedArchiveFiles)
          setFileSelectIsOpen(true)
        } else {
          toast.error('File format not supported.')
        }
      }
    }, false)

    return () => OnFileDropOff()
  }, [])

  const rootProps = getRootProps()

  const handleFileSelectClose = () => {
    setFileSelectIsOpen(false)
    setArchiveFiles([])
  }

  return (
    <div
      {...rootProps}
      className="h-full"
    >
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

      <FontFileSelector
        isOpen={fileSelectIsOpen}
        onClose={handleFileSelectClose}
        archiveFiles={archiveFiles}
        onSuccess={getLocalFonts}
      />
    </div>
  )
}

export default Local
