import { ChangeEvent, useEffect, useState } from 'react'
import { models } from 'go/models'

import useFontSettingsStore from 'stores/useFontSettingsStore'
import StyleNotAvailableIcon from 'assets/icons/warning.svg?react'

const LocalFontDisplay = ({ font }: { font: models.FontFamily }) => {
  const { previewText, fontSize, fontWeight, letterSpacing, fontItalic, textAlign } =
    useFontSettingsStore()

  const [isFontAvailable, setIsFontAvailable] = useState<{
    isAvailable: boolean
    messages: string[]
  }>()

  const [displayText, setDisplayText] = useState<string>('')

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

  useEffect(() => {
    setDisplayText(previewText.trim() || font.name)
  }, [previewText, font.name])

  const handleInputBlur = () => {
    if (!displayText) {
      setDisplayText(previewText.trim() || font.name)
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayText(e.target.value)
  }

  const itemAlign =
    textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
        ? 'justify-center'
        : 'justify-end'
  return (
    <div className={`flex items-center gap-5 ${itemAlign}`}>
      <input
        className={`text-neutral-950 bg-transparent order-2 outline-none w-full transition-[outline] duration-200 focus:outline-neutral-950 hover:outline-neutral-950 outline-1 outline-offset-[-1px] cursor-text px-2`}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={displayText}
        style={{
          fontFamily: font.name,
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacing}em`,
          fontWeight: `${fontWeight}`,
          fontStyle: `${fontItalic ? 'italic' : ''}`,
          textAlign: `${textAlign}`,
        }}
      />

      {!isFontAvailable?.isAvailable && (
        <StyleNotAvailableIcon
          className={`*:fill-neutral-400 ${textAlign === 'right' ? 'order-1' : 'order-3'}`}
        />
      )}
    </div>
  )
}

export default LocalFontDisplay
