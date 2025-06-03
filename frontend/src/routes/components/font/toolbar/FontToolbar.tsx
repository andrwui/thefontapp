import { FontFocusContext } from '../FontWrapper'
import { useContext } from 'react'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'
import { twMerge } from 'tailwind-merge'

const FontToolbar = ({ children }: { children: any }) => {
  const { textAlign } = useFontSettingsStore()

  const { isFocused } = useContext(FontFocusContext)

  const itemAlign =
    textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
        ? 'justify-center'
        : 'justify-end'

  return (
    <div
      className={twMerge(
        'relative flex h-min w-full items-center gap-2 transition-all duration-200 group-hover:pl-7',
        itemAlign,
        isFocused && 'pl-7',
      )}
    >
      {children}
    </div>
  )
}
export default FontToolbar
