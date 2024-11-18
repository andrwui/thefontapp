import useFontSettingsStore from 'stores/useFontSettingsStore'

const FontToolbar = ({ children }: { children: any }) => {
  const { textAlign } = useFontSettingsStore()

  const itemAlign =
    textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
        ? 'justify-center'
        : 'justify-end'

  return <div className={`flex w-full gap-2 h-min items-center ${itemAlign}`}>{children}</div>
}
export default FontToolbar
