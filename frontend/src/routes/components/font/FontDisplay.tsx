import { FontFocusContext } from './FontWrapper'
import Spinner from 'components/Spinner'
import { ChangeEvent, CSSProperties, useContext, useEffect, useState } from 'react'
import { GoogleFont } from 'routes/google/types/GoogleFont'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'
import { twMerge } from 'tailwind-merge'
import wf from 'webfontloader'

const FontDisplay = ({
  fontName,
  isGoogle,
  variants,
}: {
  fontName: string
  isGoogle?: boolean
  variants?: GoogleFont['variants']
}) => {
  const { previewText, fontSize, fontWeight, letterSpacing, fontItalic, textAlign } =
    useFontSettingsStore()
  const [displayText, setDisplayText] = useState<string>('')
  const [fontLoaded, setFontLoaded] = useState<boolean>(false)

  const { setIsFocused } = useContext(FontFocusContext)

  useEffect(() => {
    if (isGoogle && variants) {
      wf.load({
        google: {
          families: variants.map((v) => `${fontName}:${v}`),
        },
        fontactive: (familyName) => {
          if (familyName === fontName) {
            setFontLoaded(true)
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
    fontFamily: fontName,
    fontSize: `${fontSize}px`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: `${fontSize * 1.5}px`,
    fontWeight: `${fontWeight}`,
    fontStyle: `${fontItalic ? 'italic' : ''}`,
    textAlign: `${textAlign}`,
    maxHeight: `${fontSize * 1.5}px`,
    minHeight: `${fontSize * 1.5}px`,
  } as CSSProperties

  if (isGoogle && !fontLoaded)
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

export default FontDisplay
