import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { OnFileDrop, OnFileDropOff } from 'runtime/runtime'
import { InstallFont } from 'go/main/App'
import Dropzone from 'components/common/Dropzone'
import FontList from 'components/local-fonts/LocalFontList'
import ConfigPanel from 'components/shared/ConfigPanel'

const Local = () => {
  const { getRootProps, isDragActive } = useDropzone()

  useEffect(() => {
    OnFileDrop(async (__, _, paths) => {
      for (const path of paths) {
        const ext = path.split('.').pop()?.toLowerCase()
        if (ext === 'otf' || ext === 'ttf') {
          console.log(`Installing ${path}`)
          await InstallFont(path)
        } else {
          console.log(`invalid extension .${ext}`)
        }
      }
    }, false)

    return () => OnFileDropOff()
  }, [])

  const rootProps = getRootProps()

  return (
    <div {...rootProps}>
      {isDragActive && (
        <Dropzone>
          <div className="bg-neutral-50 w-[60vw] h-[50vh] grid place-items-center outline-dashed outline-offset-4 outline-neutral-300">
            <div className="flex flex-col gap-3 items-center">
              <p className="text-xl ">Drag files here.</p>
              <div className="flex gap-1 items-center">
                <p className="text-md text-neutral-500 ">Supported extensions:</p>
                <p className="text-md text-neutral-500 font-bold ">.otf .ttf .zip .rar</p>
              </div>
            </div>
          </div>
        </Dropzone>
      )}

      <div className="h-full w-full flex flex-col overflow-y-auto ">
        <FontList />
        <ConfigPanel />
      </div>
    </div>
  )
}

export default Local
