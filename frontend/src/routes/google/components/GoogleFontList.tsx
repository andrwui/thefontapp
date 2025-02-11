import FontDisplay from 'components/font/FontDisplay'
import FontToolbar from 'components/font/toolbar/FontToolbar'
import FontWrapper from 'components/font/FontWrapper'
import CopyFontName from 'components/font/toolbar/CopyFontName'
import FontName from 'components/font/toolbar/FontName'
import InstallFont from 'components/font/toolbar/InstallGoogleFont'
import useSearchStore from 'stores/useSearchStore'
import { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { GoogleFont } from 'types/GoogleFont'
import { useGoogleFontsStore } from 'stores/GoogleFontsStore'
import Spinner from 'components/common/Spinner'

const GoogleFontList = () => {
  const { googleFonts, loadingGoogleFonts, googleFontsHasError } = useGoogleFontsStore()
  const { searchValue } = useSearchStore()

  const [filteredFonts, setFilteredFonts] = useState([] as GoogleFont[])

  useEffect(() => {
    const filtered = searchValue
      ? googleFonts.filter(font => font.family.toLowerCase().includes(searchValue.toLowerCase()))
      : googleFonts
    setFilteredFonts(filtered)
  }, [searchValue, googleFonts])

  if (googleFontsHasError) {
    return (
      <div className="size-full flex flex-col p-5">
        <h1 className="text-7xl font-black mb-5">We all make mistakes.</h1>
        <p className="text-3xl mb-3">Please, check your internet connection and try again.</p>
        <p className="text-2xl">
          If the error persists, buy a new router. (Or just{' '}
          <a
            href="#"
            className="text-2xl underline font-extrabold"
          >
            make a bug report here
          </a>
          )
        </p>
      </div>
    )
  }
  if (loadingGoogleFonts)
    return (
      <div className="size-full">
        <Spinner />
      </div>
    )

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
