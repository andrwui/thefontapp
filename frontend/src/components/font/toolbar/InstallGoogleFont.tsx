import InstallIcon from 'assets/icons/install.svg?react'
import { InstallGoogleFont as installGoogleFont } from 'go/main/App'
import { GoogleFont } from 'types/GoogleFont'
import ToolbarIconButton from './ToolbarIconButton'
const InstallGoogleFont = ({ font }: { font: GoogleFont }) => {
  const handleClick = () => {
    for (const [type, url] of Object.entries(font.files)) {
      console.log({ type, url })
      installGoogleFont(url, `/home/andrw/.local/share/fonts/${font.family}_${type}`).then(() => {})
    }
  }
  return (
    <ToolbarIconButton
      Icon={InstallIcon}
      onClick={handleClick}
    />
  )
}

export default InstallGoogleFont
