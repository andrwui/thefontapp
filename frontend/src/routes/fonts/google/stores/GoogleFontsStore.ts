import { GoogleFont, RawGoogleFontsResponse } from 'routes/fonts/google/types/GoogleFont'
import { create } from 'zustand'

type GoogleFontsStore = {
  googleFonts: GoogleFont[]
  getGoogleFonts: () => void

  loadedGoogleFonts: string[]
  addLoadedGoogleFont: (fontName: string) => void
  isGoogleFontLoaded: (fontName: string) => boolean

  loadingGoogleFonts: boolean
  googleFontsHasError: boolean

  enabledFilters: string[]
  toggleFilter: (filter: string) => void
  clearFilters: () => void
}

export const useGoogleFontsStore = create<GoogleFontsStore>((set, store) => ({
  googleFonts: [],
  getGoogleFonts: () => {
    set({ loadingGoogleFonts: true })
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`,
      {
        headers: {
          Accept: 'application/json',
          Origin: window.location.origin,
        },
      },
    )
      .then((data) => {
        return data.json()
      })
      .then((json: RawGoogleFontsResponse) => {
        set({ googleFonts: json.items, loadingGoogleFonts: false })
      })
      .catch(() => {
        set({ googleFontsHasError: true, loadingGoogleFonts: false })
      })
  },

  loadedGoogleFonts: [],
  addLoadedGoogleFont: (fontName: string) => {
    set((state) => ({
      loadedGoogleFonts: [...state.loadedGoogleFonts, fontName],
    }))
  },
  isGoogleFontLoaded: (fontName: string) => {
    return [...store().loadedGoogleFonts].includes(fontName)
  },

  loadingGoogleFonts: false,

  googleFontsHasError: false,

  enabledFilters: [] as string[],
  toggleFilter: (filter: string) => {
    const { enabledFilters } = store()

    if (enabledFilters.indexOf(filter) === -1) {
      set({ enabledFilters: [...enabledFilters, filter] })
    } else {
      set({ enabledFilters: [...enabledFilters.filter((ef) => ef !== filter)] })
    }
  },
  clearFilters: () => {
    set({ enabledFilters: [] as string[] })
  },
}))
