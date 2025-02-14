import ToolbarIconButton from './ToolbarIconButton'
import { InstallGoogleFont as installGoogleFont } from 'go/main/App'
import { Download } from 'lucide-react'
import { GoogleFont } from 'routes/google/types/GoogleFont'
import { toSnakeCase } from 'utils/strings'

const InstallGoogleFont = ({ font }: { font: GoogleFont }) => {
  const handleClick = () => {
    for (const [type, url] of Object.entries(font.files)) {
      console.log({ type, url })
      installGoogleFont(
        url,
        toSnakeCase(`/home/andrw/.local/share/fonts/${font.family}_${type}.ttf`),
      )
    }
  }
  return (
    <ToolbarIconButton
      Icon={Download}
      onClick={handleClick}
    />
  )
}

export default InstallGoogleFont
