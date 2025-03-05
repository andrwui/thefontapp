import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Dialog from 'components/Dialog'
import Dropdown, { DropdownOption } from 'components/Dropdown'
import { useEffect, useState } from 'react'
import toast from 'utils/toast'

type ArchiveItem = { path: string; selected: boolean }

const Tests = () => {
  const handleTestToastButtonClick = () => {
    console.log('hola')
    toast.success('Font family deleted successfully.')
  }

  const [archiveFiles, setArchiveFiles] = useState<ArchiveItem[]>([] as ArchiveItem[])
  const [destPath, setDestPath] = useState<any>()

  const handleArchiveSelection = (archiveItem: ArchiveItem) => {
    setArchiveFiles((prevState) =>
      prevState.map((item) =>
        item.path === archiveItem.path ? { ...item, selected: !item.selected } : item,
      ),
    )
  }
  useEffect(() => {
    setArchiveFiles([
      { path: '/home/.fonts/font1.otf', selected: true },
      { path: '/home/.fonts/font2.otf', selected: true },
      { path: '/home/.fonts/font3.otf', selected: true },
      { path: '/home/.fonts/font4.otf', selected: true },
      { path: '/home/.fonts/font5.otf', selected: true },
      { path: '/home/.fonts/font6.otf', selected: true },
      { path: '/home/.fonts/font7.otf', selected: true },
      { path: '/home/.fonts/font8.otf', selected: true },
      { path: '/home/.fonts/font9.otf', selected: true },
      { path: '/home/.fonts/font10.otf', selected: true },
      { path: '/home/.fonts/font11.otf', selected: true },
      { path: '/home/.fonts/font12.otf', selected: true },
      { path: '/home/.fonts/font13.otf', selected: true },
      { path: '/home/.fonts/font14.otf', selected: true },
      { path: '/home/.fonts/font15.otf', selected: true },
      { path: '/home/.fonts/font16.otf', selected: true },
      { path: '/home/.fonts/font17.otf', selected: true },
      { path: '/home/.fonts/font18.otf', selected: true },
      { path: '/home/.fonts/font19.otf', selected: true },
      { path: '/home/.fonts/font20.otf', selected: true },
      { path: '/home/.fonts/font21.otf', selected: true },
      { path: '/home/.fonts/font22.otf', selected: true },
      { path: '/home/.fonts/font23.otf', selected: true },
      { path: '/home/.fonts/font24.otf', selected: true },
      { path: '/home/.fonts/font25.otf', selected: true },
      { path: '/home/.fonts/font26.otf', selected: true },
      { path: '/home/.fonts/font27.otf', selected: true },
      { path: '/home/.fonts/font28.otf', selected: true },
      { path: '/home/.fonts/font29.otf', selected: true },
      { path: '/home/.fonts/font30.otf', selected: true },
    ])
  }, [])

  const paths: DropdownOption[] = [
    {
      display:
        '/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/usr/share/fonts/',
      value: '/usr/share/fonts/',
    },
    { display: '/home/.local/fonts/', value: '/home/.local/fonts/' },
    { display: '/home/.fonts/', value: '/home/.fonts/' },
  ]

  const handlePathChange = (value: any) => {
    setDestPath(value)
  }

  const handleConfirmFiles = () => {
    console.log('configm')
  }

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false)

  return (
    <div className="flex h-full w-full items-center justify-center gap-5">
      <Button onClick={handleTestToastButtonClick}>Generate check toast</Button>
      <Button onClick={() => setIsArchiveModalOpen(true)}>Open archive modal</Button>

      <Dialog
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
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
                <p>{archive.path}</p>
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p>Destination path</p>
            <Dropdown
              hasError
              value={destPath}
              onChange={handlePathChange}
              options={paths}
              placeholder="destination..."
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-5 pt-10">
          <Button onClick={() => setIsArchiveModalOpen(false)}>Cancel</Button>
          <Button variant="cta">Confirm</Button>
        </div>
      </Dialog>
    </div>
  )
}

export default Tests
