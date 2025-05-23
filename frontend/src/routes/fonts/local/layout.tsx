import ArchiveFileSelector from './components/ArchiveFile/ArchiveFileSelector'
import { useLocalFontStore } from './stores/LocalFontStore'
import Dropzone from 'components/Dropzone'
import { ListArchiveContents, InstallLocalFont } from 'go/main/App'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import RouteContainer from 'routes/components/RouteContainer'
import FontList from 'routes/fonts/local/components/LocalFontList'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import { curateArchivePaths } from 'utils/fonts'
import { createArchiveFileStructure, FolderNode } from 'utils/fs'
import { hasArchiveExtension, hasExtension, hasFontExtension } from 'utils/strings'
import toast from 'utils/toast'

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()
  const { localFonts, getLocalFonts } = useLocalFontStore()

  const [fileSelectIsOpen, setFileSelectIsOpen] = useState<boolean>(false)
  const [fileStructure, setFileStructure] = useState<FolderNode>()
  const [archivePath, setArchivePath] = useState<string>('')

  useEffect(() => {
    getLocalFonts()
  }, [])

  useEffect(() => {
    OnFileDrop(async (__, _, paths) => {
      for (const path of paths) {
        if (!hasExtension(path)) {
          toast.error('File does not have an extension.')
          return
        }

        if (hasFontExtension(path)) {
          await InstallLocalFont(path, '~/.local/share/fonts/')
          getLocalFonts()
          toast.success('Font installed successfully.')
          return
        }

        if (hasArchiveExtension(path)) {
          const filenames = await ListArchiveContents(path)
          const curatedArchiveFilenames = curateArchivePaths(filenames)
          if (curatedArchiveFilenames.length < 1) {
            toast.error('The archive does not contain any font file or licence.')
            return
          }
          setArchivePath(path)
          setFileStructure(createArchiveFileStructure(curatedArchiveFilenames))
          setFileSelectIsOpen(true)
          return
        }
        toast.error('File format not supported.')
      }
    }, false)

    return () => OnFileDropOff()
  }, [])

  const rootProps = getRootProps()

  const handleFileSelectClose = () => {
    setFileSelectIsOpen(false)
  }

  return (
    <RouteContainer>
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
                  <p className="text-md font-bold text-neutral-400">.otf .ttf .zip</p>
                </div>
              </div>
            </div>
          </Dropzone>
        )}

        <div className="col-start-2 flex h-full w-full flex-col overflow-y-auto">
          <FontList />
        </div>

        {fileStructure && (
          <ArchiveFileSelector
            isOpen={fileSelectIsOpen}
            onClose={handleFileSelectClose}
            archivePath={archivePath}
            fileStructure={fileStructure}
            onSuccess={getLocalFonts}
          />
        )}
      </div>
    </RouteContainer>
  )
}

export default Local
