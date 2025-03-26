import FontFileSelector from './components/ArchiveFileSelector'
import { useLocalFontStore } from './stores/LocalFontStore'
import Dropzone from 'components/Dropzone'
import { ListArchiveContents, InstallLocalFont } from 'go/main/App'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import FontList from 'routes/local/components/LocalFontList'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import { curateArchiveFiles } from 'utils/fonts'
import { getFileExtension } from 'utils/strings'
import toast from 'utils/toast'

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()
  const { getLocalFonts } = useLocalFontStore()

  const [fileSelectIsOpen, setFileSelectIsOpen] = useState<boolean>(false)
  const [archiveFilenames, setArchiveFilenames] = useState<string[]>([])

  useEffect(() => {
    getLocalFonts()
  }, [])

  useEffect(() => {
    OnFileDrop(async (__, _, paths) => {
      for (const path of paths) {
        const ext = getFileExtension(path)

        if (!ext) {
          toast.error('File does not have an extension.')
          return
        }

        if (ext === 'otf' || ext === 'ttf') {
          await InstallLocalFont(path, '~/.local/share/fonts/')
          getLocalFonts()
          toast.success('Font installed successfully.')
        } else if (
          ext === 'zip' ||
          ext === 'rar' ||
          ext === 'tar' ||
          ext === 'gz' ||
          ext === '7z'
        ) {
          const filenames = await ListArchiveContents(path)
          const curatedArchiveFilenames = curateArchiveFiles(filenames)
          console.log(curatedArchiveFilenames)

          if (curatedArchiveFilenames.length < 1) {
            toast.error('The archive does not contain any font file or licence.')
            return
          }

          setArchiveFilenames(curatedArchiveFilenames)
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
    setArchiveFilenames([])
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
        archiveFilenames={archiveFilenames}
        onSuccess={getLocalFonts}
      />
    </div>
  )
}

export default Local
