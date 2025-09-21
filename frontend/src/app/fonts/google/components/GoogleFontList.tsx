import FontDisplay from '@/app/_components/font/FontDisplay'
import FontWrapper from '@/app/_components/font/FontWrapper'
import CopyFontName from '@/app/_components/font/toolbar/CopyFontName'
import FontName from '@/app/_components/font/toolbar/FontName'
import FontToolbar from '@/app/_components/font/toolbar/FontToolbar'
import InstallFont from '@/app/_components/font/toolbar/InstallGoogleFont'
import { useGoogleFontsStore } from '@/app/fonts/google/stores/GoogleFontsStore'
import { GoogleFont } from '@/app/fonts/google/types/GoogleFont'
import Spinner from '@/components/Spinner'
import useSearchStore from '@/stores/useSearchStore'
import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso'

const GoogleFontList = () => {
  const { googleFonts, loadingGoogleFonts, googleFontsHasError, enabledFilters } =
    useGoogleFontsStore()
  const { searchValue } = useSearchStore()

  const filteredFonts = googleFonts.filter((font) => {
    const matchesSearch = searchValue
      ? font.family.toLowerCase().includes(searchValue.toLowerCase())
      : true
    const matchesFilters =
      enabledFilters.length === 0 || enabledFilters.includes(font.category.toLowerCase())
    return matchesSearch && matchesFilters
  })

  if (googleFontsHasError) {
    return (
      <div className="flex size-full flex-col p-5">
        <h1 className="mb-5 text-7xl font-black">We all make mistakes.</h1>
        <p className="mb-3 text-3xl">Please, check your internet connection and try again.</p>
        <p className="text-2xl">
          If the error persists,{' '}
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
              <p>{font.variants.length}</p>
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

export default memo(GoogleFontList)
