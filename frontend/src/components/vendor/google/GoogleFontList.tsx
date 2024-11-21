import FontDisplay from 'components/font/FontDisplay'
import FontToolbar from 'components/font/FontToolbar'
import FontWrapper from 'components/font/FontWrapper'
import CopyFontName from 'components/font/toolbar/CopyFontName'
import FontName from 'components/font/toolbar/FontName'
import InstallFont from 'components/font/toolbar/InstallGoogleFont'
import useGoogleFonts from 'hooks/useGoogleFonts'
import { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import useSearchStore from 'stores/useSearchStore'
import { GoogleFont } from 'types/GoogleFont'

const GoogleFontList = () => {
  const { googleFonts, isLoading } = useGoogleFonts()
  const { searchValue } = useSearchStore()

  const [filteredFonts, setFilteredFonts] = useState([] as GoogleFont[])

  useEffect(() => {
    const filtered = searchValue
      ? googleFonts.filter(font => font.family.toLowerCase().includes(searchValue.toLowerCase()))
      : googleFonts
    setFilteredFonts(filtered)
  }, [searchValue, googleFonts])

  if (isLoading) return <div>Loading...</div>
  return (
    <Virtuoso
      data={filteredFonts}
      itemContent={(_, font: GoogleFont) => {
        return (
          <FontWrapper>
            <FontToolbar>
              <FontName>{font.family}</FontName>
              <CopyFontName fontName={font.family} />
              <InstallFont font={font} />
            </FontToolbar>
            {
              <FontDisplay
                fontName={font.family}
                isGoogle
                variants={font.variants}
              />
            }
          </FontWrapper>
        )
      }}
    />
  )
}

export default GoogleFontList
