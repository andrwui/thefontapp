import { models } from 'go/models'
import FontDisplay from './FontDisplay'
import FontToolbar from './FontToolbar'
import CopyFontName from './toolbar/CopyFontName'
import DeleteFont from './toolbar/DeleteFont'

const Font = ({ font }: { font: models.FontFamily }) => {
  return (
    <div className="flex flex-col w-full py-5 text-nowrap selection:bg-neutral-950 selection:text-neutral-50">
      <FontToolbar font={font}>
        <CopyFontName font={font} />
        <DeleteFont font={font} />
      </FontToolbar>
      <FontDisplay font={font} />
    </div>
  )
}

export default Font
