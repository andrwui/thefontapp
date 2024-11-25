import InstallIcon from 'assets/icons/install.svg?react'
import { InstallGoogleFont as installGoogleFont } from 'go/main/App'
import { toSnakeCase } from 'helper/snake_case'
import { GoogleFont } from 'types/GoogleFont'
import ToolbarIconButton from './ToolbarIconButton'
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
      Icon={InstallIcon}
      onClick={handleClick}
    />
  )
}

export default InstallGoogleFont
