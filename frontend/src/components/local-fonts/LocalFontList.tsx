import { useEffect, useState } from 'react'
import { models } from 'go/models'
import FontWrapper from 'components/shared/FontWrapper'
import { Virtuoso } from 'react-virtuoso'
import useSearchStore from 'stores/useSearchStore'
import { useLocalFontStore } from 'stores/LocalFontStore'
import FontToolbar from 'components/shared/FontToolbar'
import DeleteLocalFont from './toolbar/DeleteLocalFont'
import CopyLocalFontName from './toolbar/CopyLocalFontName'
import LocalFontDisplay from './LocalFontDisplay'
import LocalFontName from './toolbar/LocalFontName'

const LocalFontList = () => {
  const { localFonts, getLocalFonts } = useLocalFontStore()

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
    <div className="flex flex-col h-full overflow-y-scroll overflow-x-hidden">
      <Virtuoso
        totalCount={filteredFonts.length}
        style={{ height: '100%', overflowX: 'hidden' }}
        itemContent={i => {
          const font = filteredFonts[i] || localFonts[i]
          return (
            <FontWrapper>
              <FontToolbar>
                <LocalFontName font={font} />
                <CopyLocalFontName font={font} />
                <DeleteLocalFont font={font} />
              </FontToolbar>
              <LocalFontDisplay font={font} />
            </FontWrapper>
          )
        }}
      />
    </div>
  )
}

export default LocalFontList
