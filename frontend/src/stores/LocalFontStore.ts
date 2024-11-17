import { GetFonts } from 'go/main/App'
import { models } from 'go/models'
import { create } from 'zustand'

type TLocalFontStore = {
  localFonts: models.FontFamily[]
  loadingLocalFonts: boolean
  getLocalFonts: () => void
}

export const useLocalFontStore = create<TLocalFontStore>(set => ({
  localFonts: [],
  loadingLocalFonts: false,
  deletingLocalFonts: false,

  getLocalFonts: () => {
    set({ loadingLocalFonts: true })
    GetFonts().then(localFonts => {
      const sortedFonts = localFonts.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
      set({ localFonts, loadingLocalFonts: false })
    })
  },
}))
