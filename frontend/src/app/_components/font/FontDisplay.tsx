import { FontFocusContext } from './FontWrapper'
import { useGoogleFontsStore } from '@/app/fonts/google/stores/GoogleFontsStore'
import { GoogleFont } from '@/app/fonts/google/types/GoogleFont'
import Spinner from '@/components/Spinner'
import useFontSettingsStore from '@/stores/useFontSettingsStore'
import { ChangeEvent, CSSProperties, memo, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import wf from 'webfontloader'

const FontDisplay = ({
  fontName,
  isGoogle,
  variants,
  availableItalics,
  availableWeights,
}: {
  fontName: string
  isGoogle?: boolean
  variants?: GoogleFont['variants']
  availableItalics?: number[]
  availableWeights?: number[]
}) => {
  const { previewText, fontSize, fontWeight, letterSpacing, fontItalic, textAlign } =
    useFontSettingsStore()
  const { addLoadedGoogleFont, isGoogleFontLoaded } = useGoogleFontsStore()
  const [displayText, setDisplayText] = useState<string>('')

  const { setIsFocused } = useContext(FontFocusContext)

  useEffect(() => {
    console.log({ availableItalics })
    console.log({ fontWeight })
    if (isGoogle && variants && !isGoogleFontLoaded(fontName)) {
      wf.load({
        google: {
          families: variants.map((v) => `${fontName}:${v}`),
        },
        fontactive: (familyName) => {
          if (familyName === fontName) {
            addLoadedGoogleFont(fontName)
          }
        },
      })
    }
  }, [fontName])

  useEffect(() => {
    setDisplayText(previewText.trim() || fontName)
  }, [previewText, fontName])

  const handleInputBlur = () => {
    if (!displayText || !displayText.trim()) {
      setDisplayText(previewText.trim() || fontName)
    }

    setIsFocused(false)
  }
  const handleInputFocus = () => {
    setIsFocused(true)
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

  const styles = {
    fontFamily: `'${fontName}'`,
    fontSize: `${fontSize}px`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: `${fontSize * 1.5}px`,
    fontWeight: `${availableWeights && availableWeights?.includes(fontWeight) ? fontWeight : 400}`,
    fontStyle: `${fontItalic && availableItalics && availableItalics?.includes(fontWeight) ? 'italic' : ''}`,
    textAlign: `${textAlign}`,
    maxHeight: `${fontSize * 1.5}px`,
    minHeight: `${fontSize * 1.5}px`,
  } as CSSProperties

  if (isGoogle && !isGoogleFontLoaded(fontName))
    return (
      <div style={styles}>
        <Spinner size={fontSize} />
      </div>
    )

  return (
    <div
      className={twMerge(
        'flex items-center gap-5 rounded-lg transition-all duration-100',
        itemAlign,
      )}
    >
      <input
        className={`order-2 w-full cursor-text bg-transparent px-2 outline-none selection:bg-neutral-50 selection:text-neutral-50`}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        value={displayText}
        style={{ ...styles }}
      />
    </div>
  )
}

export default memo(FontDisplay)
