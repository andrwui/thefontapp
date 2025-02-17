import { type ArchiveFile } from '../types'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown from 'components/Dropdown'

type ArchiveFileSelectorProps = {
  isOpen: boolean
  onClose: () => void
  archiveFiles: ArchiveFile
  onDestinationCheck: () => void
}
const ArchiveFileSelector = ({
  isOpen,
  onClose,
  archiveFiles,
  onDestinationCheck,
}: ArchiveFileSelectorProps) => {
  return (
    <Dialog
      isOpen={fileSelectIsOpen}
      onClose={handleFileSelectClose}
      className="w-200 max-w-200"
    >
      <div className="flex w-full flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold">Select the fonts to install</h1>
        </div>
        <div className="flex max-h-80 flex-col gap-5 overflow-scroll pr-5">
          {archiveFiles.map((archive) => (
            <label className="flex gap-5">
              <Checkbox
                checked={archive.selected}
                onCheckedChange={() => handleArchiveSelection(archive)}
              />
              <p>{archive.path.split('/').pop()}</p>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p>Destination path</p>
          <Dropdown
            value={destination}
            onChange={handleDestinationChange}
            options={fontDirectories.map((d) => ({ display: d, value: d }))}
            placeholder="destination..."
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-5 pt-10">
        <Button onClick={handleFileSelectClose}>Cancel</Button>
        <Button
          variant="cta"
          onClick={handleFileSelectionConfirm}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}

export default ArchiveFileSelector
