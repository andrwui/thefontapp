import { useEffect, useState } from 'react'
import { fontfamily } from 'go/models'
import FontWrapper from 'components/font/FontWrapper'
import { Virtuoso } from 'react-virtuoso'
import useSearchStore from 'stores/useSearchStore'
import { useLocalFontStore } from 'stores/LocalFontStore'
import FontToolbar from 'components/font/toolbar/FontToolbar'
import DeleteFont from 'components/font/toolbar/DeleteFont'
import CopyFontName from 'components/font/toolbar/CopyFontName'
import FontDisplay from 'components/font/FontDisplay'
import FontName from 'components/font/toolbar/FontName'

const LocalFontList = () => {
  const { localFonts } = useLocalFontStore()
  const [filteredFonts, setFilteredFonts] = useState([] as fontfamily.FontFamily[])
  const { searchValue } = useSearchStore()

  useEffect(() => {
    const filtered = searchValue
      ? localFonts.filter(font => font.name.toLowerCase().includes(searchValue.toLowerCase()))
      : localFonts
    setFilteredFonts(filtered)
  }, [searchValue, localFonts])

  return (
    <div className="flex flex-col h-full overflow-y-scroll overflow-x-hidden">
      <Virtuoso
        data={filteredFonts}
        itemContent={(_, font: fontfamily.FontFamily) => {
          return (
            <FontWrapper>
              <FontToolbar>
                <FontName>{font.name}</FontName>
                <CopyFontName fontName={font.name} />
                <DeleteFont
                  fontPaths={font.variants.map(f => f.path)}
                  hasReadonly={font.hasReadonly}
                />
              </FontToolbar>
              <FontDisplay fontName={font.name} />
            </FontWrapper>
          )
        }}
      />
    </div>
  )
}

export default LocalFontList
