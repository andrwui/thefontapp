import Button from 'components/Button'
import { RetrieveZipFileNames } from 'go/main/App'
import toast from 'utils/toast'

const Tests = () => {
  const handleTestToastButtonClick = () => {
    console.log('hola')
    toast.correct('Font family deleted successfully.')
  }

  const TestZipFiles = async () => {
    const files = await RetrieveZipFileNames('/home/andrw/Downloads/ProggyClean.zip')
    console.log(files)
  }

  return (
    <div className="h-full w-full">
      <Button onClick={handleTestToastButtonClick}>Generate check toast</Button>
      <Button onClick={TestZipFiles}>test zip file</Button>
    </div>
  )
}

export default Tests
