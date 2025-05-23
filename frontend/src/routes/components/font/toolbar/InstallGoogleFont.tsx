import ToolbarIconButton from './ToolbarIconButton'
import { InstallGoogleFont as installGoogleFont } from 'go/main/App'
import { Check, Download } from 'lucide-react'
import { GoogleFont } from 'routes/fonts/google/types/GoogleFont'
import { useLocalFontStore } from 'routes/fonts/local/stores/LocalFontStore'
import { toSnakeCase } from 'utils/strings'
import toast from 'utils/toast'

const InstallGoogleFont = ({ font }: { font: GoogleFont }) => {
  const { localFonts, getLocalFonts } = useLocalFontStore()

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

  const isFontInstalled = () => {
    let found = false
    localFonts.forEach((localFont) => {
      if (font.family === localFont.name) {
        found = true
      }
    })
    return found
  }

  return !isFontInstalled() ? (
    <ToolbarIconButton
      Icon={Download}
      onClick={handleClick}
    />
  ) : (
    <ToolbarIconButton
      Icon={Check}
      onClick={() => {}}
      className="cursor-not-allowed"
    />
  )
}

export default InstallGoogleFont
