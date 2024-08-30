import { useEffect, useState } from 'react'
import { main } from '../../../../../../wailsjs/go/models'
import useFontSettingsStore from 'stores/useFontSettingsStore'

import StyleNotAvailableIcon from 'assets/icons/not_available.svg?react'

const FontDisplay = ({ font }: { font: main.FontFamily }) => {
  const { previewText, fontSize, fontWeight, letterSpacing, fontItalic, textAlign } =
    useFontSettingsStore()

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
    <div className={`h-f wull-full flex items-center gap-5 ${itemAlign}`}>
      <p
        className={`text-white select-none cursor-default ${textAlign === 'right' ? 'order-2' : 'order-1'}`}
        style={{
          fontFamily: font.name,
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacing}em`,
          fontWeight: `${fontWeight}`,
          lineHeight: ` ${fontSize}px`,
          fontStyle: `${fontItalic ? 'italic' : ''}`,
          textAlign: `${textAlign}`,
        }}
      >
        {previewText || font.name}
      </p>
      {!isFontAvailable?.isAvailable && (
        <StyleNotAvailableIcon
          className={`*:fill-neutral-400 ${textAlign === 'right' ? 'order-1' : 'order-2'}`}
        />
      )}
    </div>
  )
}

export default FontDisplay
