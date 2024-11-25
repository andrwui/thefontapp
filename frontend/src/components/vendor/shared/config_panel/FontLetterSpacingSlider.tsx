import Slider from 'components/common/Slider'
import { useCallback } from 'react'
import useFontSettingsStore from 'stores/useFontSettingsStore'

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

export default FontLetterSpacingSlider
