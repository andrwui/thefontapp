import Slider from 'components/common/Slider'
import useFontSettingsStore from 'stores/useFontSettingsStore'

import PencilIcon from 'assets/icons/pencil.svg?react'

import FontSizeIcon from 'assets/icons/font_size.svg?react'
import FontWeightIcon from 'assets/icons/font_weight.svg?react'
import LetterSpacingIcon from 'assets/icons/letter_spacing.svg?react'

import FontItalicOnIcon from 'assets/icons/italic_on.svg?react'
import FontItalicOffIcon from 'assets/icons/italic_off.svg?react'

import AlignLeftIcon from 'assets/icons/align_left.svg?react'
import AlignCenterIcon from 'assets/icons/align_center.svg?react'
import AlignRightIcon from 'assets/icons/align_right.svg?react'

import CyclerButton from 'components/common/CyclerButton'
import { ChangeEvent } from 'react'
import BigInput from 'components/common/BigInput'

const ConfigPanel = () => {
  const {
    fontSize,
    fontWeight,
    letterSpacing,
    previewText,
    setFontSize,
    setFontWeight,
    setFontItalic,
    setLetterSpacing,
    setPreviewText,
    setTextAlign,
    resetFontSize,
    resetFontWeight,
    resetLetterSpacing,
  } = useFontSettingsStore()

  const handlePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPreviewText(val)
  }

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

        <Slider
          input
          unit="px"
          reset={resetFontSize}
          icon={<FontSizeIcon />}
          value={[fontSize]}
          onValueChange={v => setFontSize(v[0])}
          min={60}
          max={180}
          step={5}
        />
        <Slider
          input
          unit=""
          reset={resetFontWeight}
          icon={<FontWeightIcon className="w-[20px]" />}
          value={[fontWeight]}
          onValueChange={v => setFontWeight(v[0])}
          min={100}
          max={1000}
          step={100}
        />
        <Slider
          input
          unit="em"
          reset={resetLetterSpacing}
          icon={<LetterSpacingIcon className="w-[20px]" />}
          value={[letterSpacing]}
          onValueChange={v => setLetterSpacing(v[0])}
          min={-0.15}
          max={0.5}
          step={0.01}
        />
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
