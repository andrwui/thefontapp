import ToolbarIconButton from './ToolbarIconButton'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import { Clipboard } from 'lucide-react'
import { memo, useRef, useState } from 'react'
import toast from 'utils/toast'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  const [isLoading, setIsLoading] = useState(false)

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const onClick = () => {
    setIsLoading(true)
    navigator.clipboard.writeText(fontName).then(() => {
      setIsLoading(false)
      toast.success(`"${fontName}" copied to the clipboard.`)
    })
  }

  if (isLoading) return <Spinner size={16} />

  return (
    <Tooltip content="Copy font name">
      <ToolbarIconButton
        ref={buttonRef}
        Icon={Clipboard}
        className="size-4 hover:cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  )
}

export default memo(CopyFontName)
