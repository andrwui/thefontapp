import FontSizeSlider from './FontSizeSlider'
import FontWeightSlider from './FontWeightSlider'
import FontLetterSpacingSlider from './LetterSpacingSlider'
import BigInput from 'components/BigInput'
import CyclerButton from 'components/CyclerButton'
import { AlignLeft, AlignRight, AlignCenter, Italic, Pencil } from 'lucide-react'
import { ChangeEvent, useCallback } from 'react'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'

const ConfigPanel = () => {
  const { previewText, setFontItalic, setPreviewText, setTextAlign } = useFontSettingsStore()

  const handlePreviewChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setPreviewText(val)
    },
    [setPreviewText],
  )

  return (
    <div className="flex h-28 w-full flex-col justify-between bg-neutral-50 bg-neutral-950 pt-1">
      <div className="flex h-1/2 items-center gap-10 px-5">
        <CyclerButton
          onClick={setFontItalic}
          options={[
            {
              icon: <Italic />,
              value: false,
            },
            {
              icon: <Italic />,
              value: true,
            },
          ]}
        />
        <CyclerButton
          onClick={setTextAlign}
          options={[
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
          ]}
        />
        <FontSizeSlider />
        <FontWeightSlider />
        <FontLetterSpacingSlider />
      </div>
      <BigInput
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
