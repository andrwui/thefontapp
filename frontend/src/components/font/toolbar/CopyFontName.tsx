import CopyItem from 'assets/icons/clipboard.svg?react'
import Spinner from 'components/common/Spinner'
import { useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import ToolbarIconButton from './ToolbarIconButton'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    setIsLoading(true)
    navigator.clipboard.writeText(fontName).then(() => {
      setIsLoading(false)
      toast(`"${fontName}" copied to the clipboard.`)
    })
  }

  if (isLoading) return <Spinner size="sm" />

  return (
    <ToolbarIconButton
      Icon={CopyItem}
      className="size-4 hover:cursor-pointer"
      onClick={onClick}
    />
  )
}

export default CopyFontName
