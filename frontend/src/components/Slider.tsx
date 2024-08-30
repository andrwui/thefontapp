import * as RadixSlider from '@radix-ui/react-slider'
import { useEffect, useRef, useState, ReactElement, FocusEvent } from 'react'

import ResetIcon from 'assets/icons/reset.svg?react'
import { transformWithEsbuild } from 'vite'

interface CustomSliderProps extends RadixSlider.SliderProps {
  icon?: ReactElement
  input?: boolean
  unit?: string
  reset?: () => void
}

const Slider = ({ icon, reset, unit, input, ...sliderProps }: CustomSliderProps) => {
  return (
    <div className="w-full h-6 flex items-center justify-center gap-5 ">
      {icon && icon}
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        {...sliderProps}
      >
        <RadixSlider.Track className="bg-neutral-800 relative grow rounded-full h-1">
          <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-5 h-5 bg-neutral-200 rounded-xl hover:bg-violet3 focus:outline-none"
          aria-label="Volume"
        />
      </RadixSlider.Root>
      {input && (
        <Slider.InputValue
          max={sliderProps.max!}
          min={sliderProps.min!}
          onChange={sliderProps.onValueChange}
          unit={unit!}
          value={sliderProps.value!}
        />
      )}
      {reset && (
        <ResetIcon
          onClick={reset}
          className="cursor-pointer w-16"
        />
      )}
    </div>
  )
}
type InputValueProps = {
  unit: string
  value: number[]
  onChange: ((value: number[]) => void) | undefined
  min: number
  max: number
}

Slider.InputValue = ({ unit, value, onChange, min, max }: InputValueProps): ReactElement => {
  const [inputValue, setInputValue] = useState(value[0].toString())
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value[0].toString())
  }, [value])

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true)
    setTimeout(() => e.target.select())
  }

  const handleBlur = (): void => {
    setIsFocused(false)
    if (!inputValue.trim()) {
      setInputValue(value[0].toString())
      return
    }

    const numericValue = Number(inputValue)

    if (isNaN(numericValue)) {
      setInputValue(value[0].toString())
      return
    }

    if (numericValue < min) {
      onChange!([min])
      setInputValue(min.toString())
      return
    }

    if (numericValue > max) {
      onChange!([max])
      setInputValue(max.toString())
      return
    }

    setInputValue(numericValue.toString())
    onChange!([numericValue])
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleBlur()
      inputRef.current?.blur()
    }
  }

  const valueWithUnit = unit ? (isFocused ? inputValue : `${inputValue}${unit}`) : inputValue

  return (
    <input
      ref={inputRef}
      type="text"
      value={valueWithUnit}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="w-16 bg-neutral-900 p-1 rounded-sm text-center text-sm text-regular max-xl:hidden"
    />
  )
}

export default Slider
