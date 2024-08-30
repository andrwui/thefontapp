import { main } from '../../../../../../wailsjs/go/models'
import FontDisplay from './FontDisplay'
import FontToolbar from './FontToolbar'

const Font = ({ font }: { font: main.FontFamily }) => {
  return (
    <div className="flex flex-col w-full py-5 text-nowrap">
      <FontToolbar font={font} />
      <FontDisplay font={font} />
    </div>
  )
}

export default Font
