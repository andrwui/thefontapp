import ToolbarIconButton from './ToolbarIconButton'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Spinner from 'components/Spinner'
import { useTooltip } from 'components/Tooltip'
import { DeleteFamily } from 'go/main/App'
import { Check, Trash } from 'lucide-react'
import { memo, useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { useLocalFontStore } from 'routes/fonts/local/stores/LocalFontStore'
import { twMerge } from 'tailwind-merge'

interface DeleteFontProps {
  fontPaths: string[]
  hasReadonly: boolean
  fontName: string
}

const DeleteFont = ({ fontPaths, hasReadonly }: DeleteFontProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { getLocalFonts } = useLocalFontStore()
  const { showTooltip, hideTooltip } = useTooltip()

  const handleDialogConfirm = () => {
    setIsDeleting(true)
    DeleteFamily(fontPaths).then(() => {
      setIsDeleting(false)
      setIsDialogOpen(false)
      getLocalFonts()
      toast(
        <div className="flex items-center gap-2">
          <Check size={18} />
          Font family deleted successfully.
        </div>,
      )
    })
  }

  return (
    <>
      <ToolbarIconButton
        onMouseEnter={() => {
          showTooltip({
            title: 'Delete font',
            info: 'Delete font family',
          })
        }}
        onMouseLeave={() => hideTooltip()}
        Icon={Trash}
        onClick={() => !hasReadonly && setIsDialogOpen(true)}
        className={twMerge('cursor-pointer', hasReadonly && 'cursor-not-allowed brightness-10')}
      />
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl">Delete font</h1>
          <div>
            <p>Are you sure you want to delete this font?</p>
            <p>This operation is permanent.</p>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={handleDialogConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : 'Delete'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default memo(DeleteFont)
