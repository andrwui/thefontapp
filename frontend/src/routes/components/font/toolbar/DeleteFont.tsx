import ToolbarIconButton from './ToolbarIconButton'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Spinner from 'components/Spinner'
import { DeleteFamily } from 'go/main/App'
import { Check, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { useLocalFontStore } from 'routes/local/stores/LocalFontStore'
import { twMerge } from 'tailwind-merge'

const DeleteFont = ({ fontPaths, hasReadonly }: { fontPaths: string[]; hasReadonly: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { getLocalFonts } = useLocalFontStore()

  const JuanTremendoPuto = () => {
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
    <div>
      <ToolbarIconButton
        Icon={Trash}
        onClick={() => setIsDialogOpen(true)}
        disabled={hasReadonly}
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
              onClick={JuanTremendoPuto}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : 'Delete'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DeleteFont
