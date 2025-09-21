import Button from '@/components/Button'
import toast from '@/utils/toast'

const Tests = () => {
  const handleTestToastButtonClick = () => {
    toast.success('Font family deleted successfully.')
  }

  return (
      <div className="flex h-full w-full items-center justify-center gap-5">
        <Button onClick={handleTestToastButtonClick}>Generate check toast</Button>
        <div className="rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900 px-5 py-2">
          Hover me
        </div>
      </div>
  )
}

export default Tests
