import Slider from 'components/Slider'
import { useCallback } from 'react'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'

const FontSizeSlider = () => {
  const { fontSize, setFontSize, resetFontSize } = useFontSettingsStore()

  const handleSizeChange = useCallback((v: number[]) => setFontSize(v[0]), [setFontSize])
  return (
    <Slider
      unit="px"
      onReset={resetFontSize}
      label={'Font size'}
      value={[fontSize]}
      onValueChange={handleSizeChange}
      min={60}
      max={180}
      step={5}
    />
  )
}

export default FontSizeSlider
