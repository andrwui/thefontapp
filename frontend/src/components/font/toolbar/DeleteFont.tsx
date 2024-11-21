import { useState } from 'react'
import TrashIcon from 'assets/icons/trash_can.svg?react'
import Spinner from 'components/common/Spinner'
import { DeleteFamily } from 'go/main/App'
import { useLocalFontStore } from 'stores/LocalFontStore'
import Dialog from 'components/common/Dialog'
import Button from 'components/common/Button'
import ToolbarIconButton from './ToolbarIconButton'

const DeleteFont = ({ fontPaths, hasReadonly }: { fontPaths: string[]; hasReadonly: boolean }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { getLocalFonts } = useLocalFontStore()

  const handleDelete = () => {
    setIsDeleting(true)
    DeleteFamily(fontPaths).then(() => {
      setIsDeleting(false)
      setIsDialogOpen(false)
      getLocalFonts()
    })
  }

  return (
    <div>
      <ToolbarIconButton
        Icon={TrashIcon}
        onClick={() => setIsDialogOpen(true)}
        disabled={hasReadonly}
        className={`${hasReadonly && '*:fill-neutral-300'}`}
      />
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <h1 className="text-2xl font-bold">Delete font</h1>
        <div>
          <p>Are you sure you want to delete this font?</p>
          <p>This operation is permanent.</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner /> : 'Delete'}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default DeleteFont
