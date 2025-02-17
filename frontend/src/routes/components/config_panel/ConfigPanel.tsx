import FontSizeSlider from './FontSizeSlider'
import FontWeightSlider from './FontWeightSlider'
import FontLetterSpacingSlider from './LetterSpacingSlider'
import BigInput from 'components/BigInput'
import CyclerButton from 'components/CyclerButton'
import IconSwitch from 'components/IconSwitch'
import useKeybind from 'hooks/useKeybind'
import { AlignLeft, AlignRight, AlignCenter, Italic, Pencil } from 'lucide-react'
import { ChangeEvent, useCallback, useRef } from 'react'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'

const ConfigPanel = () => {
  const { textAlign, fontItalic, previewText, setFontItalic, setPreviewText, setTextAlign } =
    useFontSettingsStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePreviewChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setPreviewText(val)
    },
    [setPreviewText],
  )

  const handleItalicSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setFontItalic(e.target.checked)
  }

  useKeybind(['Control', 'r'], () => {
    inputRef.current?.focus()
  })

  const textAlignOptions = [
    {
      icon: <AlignLeft />,
      value: 'left',
    },
    {
      icon: <AlignCenter />,
      value: 'center',
    },
    {
      icon: <AlignRight />,
      value: 'right',
    },
  ]

  const handleTextAlignChange = (value: 'left' | 'center' | 'right') => {
    setTextAlign(value)
  }

  return (
    <div className="flex h-28 w-full flex-col justify-between bg-neutral-50 bg-neutral-950 pt-1">
      <div className="flex h-1/2 items-center gap-10 px-5">
        <IconSwitch
          icon={Italic}
          onChange={handleItalicSwitch}
          checked={fontItalic}
        />
        <CyclerButton
          value={textAlign}
          onChange={handleTextAlignChange}
          options={textAlignOptions}
        />
        <FontSizeSlider />
        <FontWeightSlider />
        <FontLetterSpacingSlider />
      </div>
      <BigInput
        ref={inputRef}
        icon={Pencil}
        onChange={handlePreviewChange}
        value={previewText}
        placeholder="Replace text"
        className="h-14 min-h-14"
      />
    </div>
  )
}

export default ConfigPanel
