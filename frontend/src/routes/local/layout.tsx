import { useLocalFontStore } from './stores/LocalFontStore'
import * as Checkbox from '@radix-ui/react-checkbox'
import Dialog from 'components/Dialog'
import Dropzone from 'components/Dropzone'
import { InstallLocalFont, RetrieveZipFileNames } from 'go/main/App'
import { Check, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import FontList from 'routes/local/components/LocalFontList'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import { twMerge } from 'tailwind-merge'

type ArchiveItem = { path: string; selected: boolean }

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()
  const { getLocalFonts } = useLocalFontStore()

  const [fileSelectIsOpen, setFileSelectIsOpen] = useState<boolean>(false)
  const [archiveFiles, setArchiveFiles] = useState<ArchiveItem[]>({} as ArchiveItem[])

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
        } else if (ext === 'zip' || ext === 'rar' || ext === 'tar' || ext === 'gz') {
          setFileSelectIsOpen(true)
          const fns = await RetrieveZipFileNames(path)
          const mappedArchiveFiles = fns.map((path) => ({ path, selected: true }))
          setArchiveFiles(mappedArchiveFiles)
        }
      }
    }, false)

    return () => OnFileDropOff()
  }, [])

  const rootProps = getRootProps()

  return (
    <div
      {...rootProps}
      className="h-full"
    >
      {fileSelectIsOpen && (
        <Dialog
          isOpen={fileSelectIsOpen}
          onClose={() => setFileSelectIsOpen(false)}
        >
          <div className="flex flex-col gap-10 p-5">
            <div>
              <h1 className="text-3xl">Select files to install</h1>
            </div>
            <div className="flex w-100 flex-col gap-5">
              {archiveFiles.map((archive) => (
                <label className="flex justify-between">
                  <p>{archive.path}</p>
                  <Checkbox.Root
                    className={twMerge(
                      'flex h-5 w-5 items-center justify-center rounded-xs border border-neutral-800 bg-neutral-900',
                      archive.selected && 'bg-neutral-50',
                    )}
                    onClick={() => handleArchiveSelection(archive)}
                    checked={archive.selected}
                  >
                    <Checkbox.Indicator>
                      <Check
                        size={15}
                        className={twMerge(
                          '*:stroke-neutral-50',
                          archive.selected && '*:stroke-neutral-950',
                        )}
                      />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </label>
              ))}
            </div>
          </div>
        </Dialog>
      )}
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
