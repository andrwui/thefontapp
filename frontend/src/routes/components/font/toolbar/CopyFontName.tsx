import ToolbarIconButton from './ToolbarIconButton'
import Spinner from 'components/Spinner'
import { Clipboard } from 'lucide-react'
import { useState } from 'react'
import toast from 'utils/toast'

const CopyFontName = ({ fontName }: { fontName: string }) => {
  const [isLoading, setIsLoading] = useState(false)

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
      Icon={Clipboard}
      className="size-4 hover:cursor-pointer"
      onClick={onClick}
    />
  )
}

export default CopyFontName
