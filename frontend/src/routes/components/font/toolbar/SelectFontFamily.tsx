import { FontFocusContext } from '../FontWrapper'
import Checkbox from 'components/Checkbox'
import { font } from 'go/models'
import { useContext, useEffect } from 'react'
import { useSelectedLocalFontsStore } from 'routes/local/stores/SelectedLocalFontsStore'
import { twMerge } from 'tailwind-merge'

type SelectFontFamilyProps = { font: font.FontFamily }

const SelectFontFamily = ({ font }: SelectFontFamilyProps) => {
  const { selectedFonts, toggleSelectedFont } = useSelectedLocalFontsStore()
  const { isFocused, setIsFocused } = useContext(FontFocusContext)

  useEffect(() => {
    if (selectedFonts.has(font.name)) {
      setIsFocused(true)
    }
  }, [])

  const handleCheckedChange = () => {
    toggleSelectedFont(font.name)
    setIsFocused(!selectedFonts.has(font.name))
  }

  return (
    <Checkbox
      checked={selectedFonts.has(font.name)}
      onCheckedChange={handleCheckedChange}
      className={twMerge(
        'absolute left-0 opacity-0 group-hover:opacity-100 checked:bg-neutral-50',
        isFocused && 'opacity-100',
      )}
    />
  )
}

export default SelectFontFamily
