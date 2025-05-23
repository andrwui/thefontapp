import { create } from 'zustand'

type SelectedLocalFontsStore = {
  selectedFonts: Set<string>
  toggleSelectedFont: (fontName: string) => void
}

export const useSelectedLocalFontsStore = create<SelectedLocalFontsStore>((set) => ({
  selectedFonts: new Set(),
  resetSelectedFonts: set({ selectedFonts: new Set() }),

  toggleSelectedFont: (fontName: string) => {
    set((state) => {
      const newSelectedFonts = new Set(state.selectedFonts)

      if (newSelectedFonts.has(fontName)) {
        newSelectedFonts.delete(fontName)
      } else {
        newSelectedFonts.add(fontName)
      }

      return { selectedFonts: newSelectedFonts }
    })
  },
}))
