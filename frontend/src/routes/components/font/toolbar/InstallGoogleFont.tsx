import ToolbarIconButton from './ToolbarIconButton'
import { InstallGoogleFont as installGoogleFont } from 'go/main/App'
import { Download } from 'lucide-react'
import { GoogleFont } from 'routes/google/types/GoogleFont'
import { useLocalFontStore } from 'routes/local/stores/LocalFontStore'
import { toSnakeCase } from 'utils/strings'
import toast from 'utils/toast'

const InstallGoogleFont = ({ font }: { font: GoogleFont }) => {
  const { getLocalFonts } = useLocalFontStore()

  const handleClick = async () => {
    const toastID = toast.loading(`Installing "${font.family}"...`)
    try {
      const start = performance.now()
      for (const [type, url] of Object.entries(font.files)) {
        await installGoogleFont(
          url,
          toSnakeCase(`/home/andrw/.local/share/fonts/${font.family}_${type}.ttf`),
        )
        toast.loading(`Installing "${font.family} ${type}"...`, toastID)
      }
      console.log(`${performance.now() - start}ms`)
      toast.success(`Font family ${font.family} successfully installed.`, toastID)
    } catch (error) {
      toast.error(
        <p>
          Font family "{font.family}" could not be installed.{' '}
          <button
            onClick={() => navigator.clipboard.writeText(error as string)}
            className="bg-transparent p-0 underline underline-offset-1"
          >
            Report an error.
          </button>
        </p>,
        toastID,
      )
    }
    getLocalFonts()
  }
  return (
    <ToolbarIconButton
      Icon={Download}
      onClick={handleClick}
    />
  )
}

export default InstallGoogleFont
