import { ChangeEvent, CSSProperties, useContext, useEffect, useState } from 'react'
import Spinner from 'components/common/Spinner'
import useFontSettingsStore from 'stores/useFontSettingsStore'
import { GoogleFont } from 'types/GoogleFont'
import wf from 'webfontloader'
import { FontFocusContext } from './FontWrapper'

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
          families: variants.map(v => `${fontName}:${v}`),
        },
        fontactive: familyName => {
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
    if (!displayText) {
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
        <Spinner />
      </div>
    )

  return (
    <div className={`flex items-center gap-5 ${itemAlign} `}>
      <input
        className={`text-neutral-950 bg-transparent order-2 outline-none w-full transition-[outline] duration-200 focus:outline-neutral-950 hover:outline-neutral-950 outline-1 outline-offset-[-1px] cursor-text px-2`}
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
