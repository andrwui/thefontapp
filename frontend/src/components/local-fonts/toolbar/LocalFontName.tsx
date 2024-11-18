import { models } from 'go/models'
const LocalFontName = ({ font }: { font: models.FontFamily }) => {
  return <p className="text-lg">{font.name}</p>
}

export default LocalFontName
