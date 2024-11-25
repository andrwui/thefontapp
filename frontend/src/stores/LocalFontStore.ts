import { GetFonts } from 'go/main/App'
import { fontfamily } from 'go/models'
import { create } from 'zustand'

type LocalFontStore = {
  localFonts: fontfamily.FontFamily[]
  loadingLocalFonts: boolean
  getLocalFonts: () => void
}

export const useLocalFontStore = create<LocalFontStore>(set => ({
  localFonts: [],
  loadingLocalFonts: false,

  getLocalFonts: () => {
    set({ loadingLocalFonts: true })
    GetFonts().then(localFonts => {
      const sortedFonts = localFonts.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
      set({ localFonts: sortedFonts, loadingLocalFonts: false })
    })
  },
}))
