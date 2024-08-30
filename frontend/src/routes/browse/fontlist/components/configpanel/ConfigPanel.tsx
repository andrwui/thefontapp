import Slider from 'components/Slider'
import useFontSettingsStore from 'stores/useFontSettingsStore'

import FontSizeIcon from 'assets/icons/font_size.svg?react'
import FontWeightIcon from 'assets/icons/font_weight.svg?react'
import LetterSpacingIcon from 'assets/icons/letter_spacing.svg?react'

import FontItalicOnIcon from 'assets/icons/italic_on.svg?react'
import FontItalicOffIcon from 'assets/icons/italic_off.svg?react'

import AlignLeftIcon from 'assets/icons/align_left.svg?react'
import AlignCenterIcon from 'assets/icons/align_center.svg?react'
import AlignRightIcon from 'assets/icons/align_right.svg?react'

import CancelIcon from 'assets/icons/cancel.svg?react'
import CyclerButton from 'components/CyclerButton'

const ConfigPanel = () => {
  const {
    fontSize,
    fontWeight,
    fontItalic,
    letterSpacing,
    previewText,
    textAlign,
    setFontSize,
    setFontWeight,
    setFontItalic,
    setLetterSpacing,
    setPreviewText,
    setTextAlign,
    resetFontSize,
    resetFontWeight,
    resetLetterSpacing,
    resetPreviewText,
  } = useFontSettingsStore()

  return (
    <div className="h-28 w-full bg-neutral-950 flex flex-col pt-1 justify-between">
      <div className="flex gap-10 h-1/2 items-center">
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
          max={120}
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
      <div className="w-full pr-3 h-1/2 relative">
        <input
          value={previewText}
          onChange={v => setPreviewText(v.target.value)}
          placeholder="replace text"
          className="w-full h-9 bg-neutral-950 focus:outline-none"
        />
        {previewText && (
          <CancelIcon
            onClick={() => setPreviewText('')}
            className="absolute top-1/2 right-0 -translate-x-[15px] transform -translate-y-1/2 size-3 cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}

export default ConfigPanel
