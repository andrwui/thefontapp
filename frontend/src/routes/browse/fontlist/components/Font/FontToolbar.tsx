import { main } from '../../../../../../wailsjs/go/models'
import CopyFontName from './toolbar/CopyFontName'

import useFontSettingsStore from 'stores/useFontSettingsStore'

import { useEffect, useState } from 'react'

const FontToolbar = ({ font }: { font: main.FontFamily }) => {
  const { fontWeight, fontItalic, textAlign } = useFontSettingsStore()
  const [isFontAvailable, setIsFontAvailable] = useState<{
    isAvailable: boolean
    messages: string[]
  }>()

  useEffect(() => {
    setIsFontAvailable(getIsFontAvailable)
  }, [fontItalic, fontWeight])

  const getIsFontAvailable = (): { isAvailable: boolean; messages: string[] } => {
    const isWeightAvailable =
      Array.isArray(font.availableWeights) && font.availableWeights.indexOf(fontWeight) !== -1

    const isItalicWeightAvailable =
      Array.isArray(font.availableItalicWeights) &&
      font.availableItalicWeights.indexOf(fontWeight) !== -1

    let isAvailable: boolean = true
    const messages: string[] = []

    if (font.name === 'Marlett') {
      const aw = font.availableWeights
      console.log({ aw, isWeightAvailable })
    }

    if (!isWeightAvailable) {
      isAvailable = false
      messages.push(
        'the current weight may not be supported and may be artificially altered by CSS',
      )
      isAvailable = false
    }

    if (fontItalic && !isItalicWeightAvailable) {
      messages.push(
        'the current weight may not support italic and may be artificially skewed by CSS',
      )
      isAvailable = false
    }

    return { isAvailable, messages }
  }

  const itemAlign =
    textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
        ? 'justify-center'
        : 'justify-end'

  return (
    <div className={`flex w-full gap-2 h-min items-center ${itemAlign}`}>
      <p className="text-lg">{font.name}</p>
      <CopyFontName font={font} />
    </div>
  )
}
export default FontToolbar
