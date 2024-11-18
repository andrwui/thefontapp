import CopyItem from 'assets/icons/clipboard.svg?react'
import { models } from 'go/models'

const CopyLocalFontName = ({ font }: { font: models.FontFamily }) => {
  return (
    <CopyItem
      className="size-4 hover:cursor-pointer"
      onClick={async () => await navigator.clipboard.writeText(font.name)}
    />
  )
}

export default CopyLocalFontName
