import Slider from '@/components/Slider'
import useFontSettingsStore from '@/stores/useFontSettingsStore'
import { memo, useCallback } from 'react'

const FontLetterSpacingSlider = () => {
  const { letterSpacing, setLetterSpacing, resetLetterSpacing } = useFontSettingsStore()

  const handleLetterSpacingChange = useCallback(
    (v: number[]) => setLetterSpacing(v[0]),
    [setLetterSpacing],
  )

  return (
    <Slider
      unit="em"
      onReset={resetLetterSpacing}
      label={'Letter spacing'}
      value={[letterSpacing]}
      onValueChange={handleLetterSpacingChange}
      min={-0.15}
      max={0.5}
      step={0.01}
    />
  )
}

export default memo(FontLetterSpacingSlider)
