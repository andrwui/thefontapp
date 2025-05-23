import ToolbarIconButton from './ToolbarIconButton'
import Spinner from 'components/Spinner'
import { useTooltip } from 'components/Tooltip'
import { Clipboard } from 'lucide-react'
import { memo, useRef, useState } from 'react'
import toast from 'utils/toast'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { hideTooltip, showTooltip } = useTooltip()

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
    <ToolbarIconButton
      onMouseEnter={() => {
        showTooltip({
          title: 'Copy family name',
          info: 'Copy family name',
        })
      }}
      onMouseLeave={() => hideTooltip()}
      ref={buttonRef}
      Icon={Clipboard}
      className="size-4 hover:cursor-pointer"
      onClick={onClick}
    />
  )
}

export default memo(CopyFontName)
