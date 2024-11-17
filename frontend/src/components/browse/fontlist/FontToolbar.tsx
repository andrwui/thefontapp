import { models } from 'go/models'
import useFontSettingsStore from 'stores/useFontSettingsStore'

import { useEffect, useState } from 'react'

const FontToolbar = ({ font, children }: { font: models.FontFamily; children: any }) => {
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
      {children}
    </div>
  )
}
export default FontToolbar
