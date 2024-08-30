import { useEffect, useState } from 'react'
import { main } from '../../../../wailsjs/go/models'
import { GetFonts } from '../../../../wailsjs/go/main/App'
import Font from './components/Font/Font'
import { Virtuoso } from 'react-virtuoso'
import useSearchStore from '../../../stores/useSearchStore'

const FontList = () => {
  const [fonts, setFonts] = useState([] as main.FontFamily[])
  const [filteredFonts, setFilteredFonts] = useState([] as main.FontFamily[])

  const { searchValue } = useSearchStore()

  useEffect(() => {
    const filtered = searchValue
      ? fonts.filter(font => font.name.toLowerCase().includes(searchValue.toLowerCase()))
      : fonts
    setFilteredFonts(filtered)
  }, [searchValue, fonts])

  useEffect(() => {
    GetFonts()
      .then(fonts =>
        fonts.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }),
      )
      .then(setFonts)
  }, [])

  return (
    <div className="flex flex-col h-full overflow-y-scroll overflow-x-hidden pr-10 scroll-p-5">
      <Virtuoso
        totalCount={filteredFonts.length}
        style={{ height: '100%', overflowX: 'hidden' }}
        itemContent={i => <Font font={filteredFonts[i]} />}
      ></Virtuoso>
    </div>
  )
}

export default FontList
