import { GetLocalFonts } from 'go/main/App'
import { font } from 'go/models'
import { create } from 'zustand'

type LocalFontStore = {
  localFonts: font.FontFamily[]
  loadingLocalFonts: boolean
  getLocalFonts: () => void
}

export const useLocalFontStore = create<LocalFontStore>((set) => ({
  localFonts: [],
  loadingLocalFonts: false,

  getLocalFonts: () => {
    set({ loadingLocalFonts: true })
    GetLocalFonts()
      .then((font) => {
        console.log(font)
        const sortedFonts = font.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        set({ localFonts: sortedFonts, loadingLocalFonts: false })
      })
      .catch((error) => console.log(error))
  },
}))
