import * as RadixSlider from '@radix-ui/react-slider'
import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react'

import ResetIcon from 'assets/icons/cross.svg?react'

type CustomSliderProps = RadixSlider.SliderProps & {
  label?: string
  unit?: string
  onReset: () => void
}

const Slider = ({ label, unit, onReset, ...sliderProps }: CustomSliderProps) => {
  return (
    <div className="w-full h-6 flex items-center justify-center gap-5 ">
      <div className="flex flex-col w-full gap-1">
        <p className="text-sm">{label}</p>
        <RadixSlider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          {...sliderProps}
        >
          <RadixSlider.Track className="bg-neutral-300 relative grow  h-1">
            <RadixSlider.Range className="absolute bg-neutral-950  h-full" />
          </RadixSlider.Track>
          <RadixSlider.Thumb className="block w-4 h-4 bg-neutral-950 rounded-full focus:outline-none" />
        </RadixSlider.Root>
      </div>
      <div className="flex items-center gap-1 border pr-2">
        <InputValue
          max={sliderProps.max!}
          min={sliderProps.min!}
          onChange={sliderProps.onValueChange}
          unit={unit!}
          value={sliderProps.value!}
        />
        <ResetIcon
          onClick={onReset}
          className="cursor-pointer"
        />
      </div>
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

const InputValue = ({ unit, value, onChange, min, max }: InputValueProps): ReactElement => {
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
      className="w-16 bg-neutral-50 p-1 rounded-sm text-center text-xs text-regular max-xl:hidden"
    />
  )
}

export default Slider
