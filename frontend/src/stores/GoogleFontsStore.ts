import { GOOGLE_FONTS_API_KEY } from 'constants/GoogleFonts'
import { GoogleFont, RawGoogleFontsResponse } from 'types/GoogleFont'
import { create } from 'zustand'

type GoogleFontsStore = {
  loadingGoogleFonts: boolean
  googleFonts: GoogleFont[]
  getGoogleFonts: () => void
  googleFontsHasError: boolean
}

export const useGoogleFontsStore = create<GoogleFontsStore>(set => ({
  googleFonts: [],
  loadingGoogleFonts: false,
  googleFontsHasError: false,
  getGoogleFonts: () => {
    set({ loadingGoogleFonts: true })
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`, {
      headers: {
        Accept: 'application/json',
        Origin: window.location.origin,
      },
    })
      .then(data => {
        return data.json()
      })
      .then((json: RawGoogleFontsResponse) => {
        set({ googleFonts: json.items, loadingGoogleFonts: false })
      })
      .catch(() => {
        set({ googleFontsHasError: true, loadingGoogleFonts: false })
      })
  },
}))
