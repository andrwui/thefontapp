import { font } from 'go/models'
import { useEffect } from 'react'

const WEIGHT_MAP: Record<string, number> = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Normal: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
}
const parseVariantStyle = (variantName: string): { weight: number; style: string } => {
  const name = variantName.trim()
  const isItalic = name.toLowerCase().includes('italic')
  const weightName = name.replace(/italic/gi, '').trim()
  const weight = Object.entries(WEIGHT_MAP).reduce((acc, [key, value]) => {
    if (weightName.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
    return acc
  }, 400)
  return {
    weight,
    style: isItalic ? 'italic' : 'normal',
  }
}
const useLoadFontFaces = (fonts: font.FontFamily[]) => {
  useEffect(() => {
    const loadedFonts: FontFace[] = []
    fonts.forEach((fontFamily) => {
      fontFamily.variants.forEach((variant) => {
        const { weight, style } = parseVariantStyle(variant.name)
        const fontFace = new FontFace(fontFamily.name, `url("wails:///${variant.path}")`, {
          weight: weight.toString(),
          style,
        })
        loadedFonts.push(fontFace)
        fontFace.load().then(() => {
          document.fonts.add(fontFace)
        })
      })
    })
    return () => {
      loadedFonts.forEach((font) => {
        document.fonts.delete(font)
      })
    }
  }, [fonts])
}
export default useLoadFontFaces
