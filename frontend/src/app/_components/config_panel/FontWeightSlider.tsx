import Slider from '@/components/Slider'
import useFontSettingsStore from '@/stores/useFontSettingsStore'
import { memo, useCallback } from 'react'

const FontWeightSlider = () => {
  const { fontWeight, setFontWeight, resetFontWeight } = useFontSettingsStore()

  const handleWeightChange = useCallback((v: number[]) => setFontWeight(v[0]), [setFontWeight])

  return (
    <Slider
      unit=""
      onReset={resetFontWeight}
      label={'Font weight'}
      value={[fontWeight]}
      onValueChange={handleWeightChange}
      min={100}
      max={1000}
      step={100}
    />
  )
}

export default memo(FontWeightSlider)
