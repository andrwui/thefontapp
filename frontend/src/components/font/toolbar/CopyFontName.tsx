import CopyItem from 'assets/icons/clipboard.svg?react'
import ToolbarIconButton from './ToolbarIconButton'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  return (
    <ToolbarIconButton
      Icon={CopyItem}
      className="size-4 hover:cursor-pointer"
      onClick={async () => await navigator.clipboard.writeText(fontName)}
    />
  )
}

export default CopyFontName
