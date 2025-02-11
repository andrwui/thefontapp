import useFontSettingsStore from 'stores/useFontSettingsStore'

import PencilIcon from 'assets/icons/pencil.svg?react'

import FontItalicOnIcon from 'assets/icons/italic_on.svg?react'
import FontItalicOffIcon from 'assets/icons/italic_off.svg?react'

import AlignLeftIcon from 'assets/icons/align_left.svg?react'
import AlignCenterIcon from 'assets/icons/align_center.svg?react'
import AlignRightIcon from 'assets/icons/align_right.svg?react'

import CyclerButton from 'components/common/CyclerButton'
import { ChangeEvent, useCallback } from 'react'
import BigInput from 'components/common/BigInput'
import FontSizeSlider from './FontSizeSlider'
import FontWeightSlider from './FontWeightSlider'
import FontLetterSpacingSlider from './FontLetterSpacingSlider'

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
    <div className="h-28 w-full bg-neutral-50 flex flex-col pt-1 justify-between border-t ">
      <div className="flex gap-10 h-1/2 items-center px-5">
        <CyclerButton
          onClick={setFontItalic}
          options={[
            {
              icon: <FontItalicOffIcon />,
              value: false,
            },
            {
              icon: <FontItalicOnIcon />,
              value: true,
            },
          ]}
        />
        <CyclerButton
          onClick={setTextAlign}
          options={[
            {
              icon: <AlignLeftIcon />,
              value: 'left',
            },
            {
              icon: <AlignCenterIcon />,
              value: 'center',
            },
            {
              icon: <AlignRightIcon />,
              value: 'right',
            },
          ]}
        />
        <FontSizeSlider />
        <FontWeightSlider />
        <FontLetterSpacingSlider />
      </div>
      <BigInput
        Icon={PencilIcon}
        onChange={handlePreviewChange}
        value={previewText}
        placeholder="Replace text"
        className="border-t h-2/5"
      />
    </div>
  )
}

export default ConfigPanel
