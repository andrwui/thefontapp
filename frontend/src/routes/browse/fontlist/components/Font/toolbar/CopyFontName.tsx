import CopyItem from 'assets/icons/copy_name.svg?react'
import { main } from '../../../../../../../wailsjs/go/models'

const CopyFontName = ({ font }: { font: main.FontFamily }) => {
  return <CopyItem onClick={async () => await navigator.clipboard.writeText(font.name)} />
}

export default CopyFontName
