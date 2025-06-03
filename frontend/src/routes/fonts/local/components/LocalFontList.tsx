import { font } from 'go/models'
import { Virtuoso } from 'react-virtuoso'
import FontDisplay from 'routes/components/font/FontDisplay'
import FontWrapper from 'routes/components/font/FontWrapper'
import CopyFontName from 'routes/components/font/toolbar/CopyFontName'
import DeleteFont from 'routes/components/font/toolbar/DeleteFont'
import FontName from 'routes/components/font/toolbar/FontName'
import FontToolbar from 'routes/components/font/toolbar/FontToolbar'
import SelectFontFamily from 'routes/components/font/toolbar/SelectFontFamily'
import StyleNotAvailable from 'routes/components/font/toolbar/StyleNotAvailable'
import { useLocalFontStore } from 'routes/fonts/local/stores/LocalFontStore'
import useSearchStore from 'routes/stores/useSearchStore'

const LocalFontList = () => {
  const { localFonts } = useLocalFontStore()
  const { searchValue } = useSearchStore()

  const filteredFonts = searchValue
    ? localFonts.filter((font) => font.name.toLowerCase().includes(searchValue.toLowerCase()))
    : localFonts

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
                <p className="text-neutral-400">({font.variants.length})</p>
                <StyleNotAvailable
                  availableItalics={font.availableItalicWeights}
                  availableWeights={font.availableWeights}
                />
                <CopyFontName fontName={font.name} />
                <DeleteFont
                  fontName={font.name}
                  fontPaths={font.variants.map((f) => f.path)}
                  hasReadonly={font.hasReadonly}
                />
              </FontToolbar>
              <FontDisplay
                fontName={font.name}
                availableItalics={font.availableItalicWeights}
                availableWeights={font.availableWeights}
              />
            </FontWrapper>
          )
        }}
      />
    </div>
  )
}

export default LocalFontList
