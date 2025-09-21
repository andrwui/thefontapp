import { create } from 'zustand'

type FontsSettingsStore = {
  previewText: string
  fontSize: number
  fontWeight: number
  letterSpacing: number
  fontItalic: boolean
  textAlign: 'left' | 'center' | 'right'

  setPreviewText: (text: string) => void
  setFontSize: (size: number) => void
  setFontWeight: (weight: number) => void
  setLetterSpacing: (letterSpacing: number) => void
  setFontItalic: (fontItalic: boolean) => void
  setTextAlign: (textAlign: 'left' | 'center' | 'right') => void

  resetPreviewText: () => void
  resetFontSize: () => void
  resetFontWeight: () => void
  resetLetterSpacing: () => void
}

const defaultFontSize = 60,
  defaultFontWeight = 400,
  defaultLetterSpacing = 0,
  defaultFontItalic = false,
  defaultTextAlign = 'left'

const useFontSettingsStore = create<FontsSettingsStore>((set) => ({
  previewText: '',
  fontSize: defaultFontSize,
  fontWeight: defaultFontWeight,
  letterSpacing: defaultLetterSpacing,
  fontItalic: defaultFontItalic,
  textAlign: defaultTextAlign,

  setPreviewText: (previewText: string) => set({ previewText }),
  setFontSize: (fontSize: number) => set({ fontSize }),
  setFontWeight: (fontWeight) => set({ fontWeight }),
  setLetterSpacing: (letterSpacing: number) => set({ letterSpacing }),
  setFontItalic: (fontItalic: boolean) => set({ fontItalic }),
  setTextAlign: (textAlign: 'left' | 'center' | 'right') => set({ textAlign }),

  resetPreviewText: () => set({ previewText: '' }),
  resetFontSize: () => set({ fontSize: defaultFontSize }),
  resetFontWeight: () => set({ fontWeight: defaultFontWeight }),
  resetLetterSpacing: () => set({ letterSpacing: defaultLetterSpacing }),
}))

export default useFontSettingsStore
