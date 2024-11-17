import { useEffect, useState } from 'react'
import { models } from 'go/models'
import Font from './fontlist/FontWrapper'
import { Virtuoso } from 'react-virtuoso'
import useSearchStore from 'stores/useSearchStore'
import { useLocalFontStore } from 'stores/LocalFontStore'

const FontList = () => {
  const { localFonts, getLocalFonts, loadingLocalFonts } = useLocalFontStore()

  const [filteredFonts, setFilteredFonts] = useState([] as models.FontFamily[])

  const { searchValue } = useSearchStore()

  useEffect(() => {
    const filtered = searchValue
      ? localFonts.filter(font => font.name.toLowerCase().includes(searchValue.toLowerCase()))
      : localFonts
    setFilteredFonts(filtered)
  }, [searchValue, localFonts])

  useEffect(() => {
    getLocalFonts()
  }, [])

  return (
    <div className="flex flex-col h-full overflow-y-scroll overflow-x-hidden pr-10 scroll-p-5 px-5">
      <Virtuoso
        totalCount={filteredFonts.length}
        style={{ height: '100%', overflowX: 'hidden' }}
        itemContent={i => <Font font={filteredFonts[i]} />}
      />
    </div>
  )
}

export default FontList
