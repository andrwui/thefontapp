import Spinner from 'components/Spinner'
import { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import FontDisplay from 'routes/components/font/FontDisplay'
import FontWrapper from 'routes/components/font/FontWrapper'
import CopyFontName from 'routes/components/font/toolbar/CopyFontName'
import FontName from 'routes/components/font/toolbar/FontName'
import FontToolbar from 'routes/components/font/toolbar/FontToolbar'
import InstallFont from 'routes/components/font/toolbar/InstallGoogleFont'
import { useGoogleFontsStore } from 'routes/google/stores/GoogleFontsStore'
import { GoogleFont } from 'routes/google/types/GoogleFont'
import useSearchStore from 'routes/stores/useSearchStore'

const GoogleFontList = () => {
  const { googleFonts, loadingGoogleFonts, googleFontsHasError } = useGoogleFontsStore()
  const { searchValue } = useSearchStore()

  const [filteredFonts, setFilteredFonts] = useState([] as GoogleFont[])

  useEffect(() => {
    const filtered = searchValue
      ? googleFonts.filter((font) => font.family.toLowerCase().includes(searchValue.toLowerCase()))
      : googleFonts
    setFilteredFonts(filtered)
  }, [searchValue, googleFonts])

  if (googleFontsHasError) {
    return (
      <div className="flex size-full flex-col p-5">
        <h1 className="mb-5 text-7xl font-black">We all make mistakes.</h1>
        <p className="mb-3 text-3xl">Please, check your internet connection and try again.</p>
        <p className="text-2xl">
          If the error persists, buy a new router. (Or just{' '}
          <a
            href="#"
            className="text-2xl font-extrabold underline"
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
