import useFontSettingsStore from 'routes/stores/useFontSettingsStore'
import { twMerge } from 'tailwind-merge'

const FontToolbar = ({ children }: { children: any }) => {
  const { textAlign } = useFontSettingsStore()

  const itemAlign =
    textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
        ? 'justify-center'
        : 'justify-end'

  return (
    <div className={twMerge('flex h-min w-full items-center gap-2', itemAlign)}>{children}</div>
  )
}
export default FontToolbar
