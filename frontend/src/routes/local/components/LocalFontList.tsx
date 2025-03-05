import { font } from 'go/models'
import { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import FontDisplay from 'routes/components/font/FontDisplay'
import FontWrapper from 'routes/components/font/FontWrapper'
import CopyFontName from 'routes/components/font/toolbar/CopyFontName'
import DeleteFont from 'routes/components/font/toolbar/DeleteFont'
import FontName from 'routes/components/font/toolbar/FontName'
import FontToolbar from 'routes/components/font/toolbar/FontToolbar'
import SelectFontFamily from 'routes/components/font/toolbar/SelectFontFamily'
import { useLocalFontStore } from 'routes/local/stores/LocalFontStore'
import useSearchStore from 'routes/stores/useSearchStore'

const LocalFontList = () => {
  const { localFonts } = useLocalFontStore()
  const [filteredFonts, setFilteredFonts] = useState([] as font.FontFamily[])
  const { searchValue } = useSearchStore()

  useEffect(() => {
    const filtered = searchValue
      ? localFonts.filter((font) => font.name.toLowerCase().includes(searchValue.toLowerCase()))
      : localFonts
    setFilteredFonts(filtered)
  }, [searchValue, localFonts])

  return (
    <div className="col-start-2 row-start-2 flex h-full flex-col overflow-x-hidden overflow-y-scroll">
      <Virtuoso
        data={filteredFonts}
        itemContent={(_, font: font.FontFamily) => {
          return (
            <FontWrapper>
              <FontToolbar>
                <SelectFontFamily font={font} />
                <FontName>{font.name}</FontName>
                <p>{font.variants.length}</p>
                <CopyFontName fontName={font.name} />
                <DeleteFont
                  fontPaths={font.variants.map((f) => f.path)}
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
