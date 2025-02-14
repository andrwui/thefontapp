import * as RadixSlider from '@radix-ui/react-slider'
import { RotateCcw } from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react'

type CustomSliderProps = RadixSlider.SliderProps & {
  label?: string
  unit?: string
  onReset: () => void
}

const Slider = ({ label, unit, onReset, ...sliderProps }: CustomSliderProps) => {
  return (
    <div className="flex h-6 w-full items-center justify-center gap-5">
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm">{label}</p>
        <RadixSlider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          {...sliderProps}
        >
          <RadixSlider.Track className="relative h-1 grow bg-neutral-900">
            <RadixSlider.Range className="absolute h-full bg-neutral-50" />
          </RadixSlider.Track>
          <RadixSlider.Thumb className="block h-4 w-4 rounded-full bg-neutral-50 focus:outline-none" />
        </RadixSlider.Root>
      </div>
      <div className="flex items-center gap-5 pr-2">
        <InputValue
          max={sliderProps.max!}
          min={sliderProps.min!}
          onChange={sliderProps.onValueChange}
          unit={unit!}
          value={sliderProps.value!}
        />
        <RotateCcw
          size={14}
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
      className="text-regular w-16 rounded-sm bg-neutral-900 p-1 text-center text-xs max-xl:hidden"
    />
  )
}

export default Slider
