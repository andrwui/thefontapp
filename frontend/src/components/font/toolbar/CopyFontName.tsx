import CopyItem from 'assets/icons/clipboard.svg?react'
import Spinner from 'components/common/Spinner'
import { toast } from 'react-hot-toast/headless'
import ToolbarIconButton from './ToolbarIconButton'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  const onClick = async () => {
    const id = toast.custom(
      <div className="flex gap-5 items-center justify-start">
        <Spinner size="sm" /> Copying "${fontName}" to clipboard...
      </div>,
    )
    navigator.clipboard.writeText(fontName).then(() => {
      toast(`"${fontName}" copied to the clipboard.`, { id: id })
    })
  }

  return (
    <ToolbarIconButton
      Icon={CopyItem}
      className="size-4 hover:cursor-pointer"
      onClick={onClick}
    />
  )
}

export default CopyFontName
