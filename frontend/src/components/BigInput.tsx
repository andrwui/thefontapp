import { X } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import React, { ChangeEvent, FocusEvent, forwardRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type BigInputProps = {
  floating?: boolean
  icon: LucideIcon
  inputClassName?: string
} & React.HTMLProps<HTMLInputElement>

const BigInput = forwardRef<HTMLInputElement, BigInputProps>(
  (
    { floating, icon: Icon, value, onBlur, onFocus, onChange, className, inputClassName, ...rest },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus) {
        onFocus(e)
      }
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur) {
        onBlur(e)
      }
    }

    const handleReset = () => {
      setInputValue('')
      const synthEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as ChangeEvent<HTMLInputElement>
      if (onChange) {
        onChange(synthEvent)
      }
    }

    return (
      <div
        className={twMerge(
          'relative flex w-full items-center px-5',
          floating && 'rounded-md border-1 border-neutral-800 bg-neutral-900',
          className,
        )}
      >
        <Icon
          className={twMerge(
            'absolute left-5 size-4 opacity-100 transition-all duration-100 *:stroke-neutral-600',
            isFocused && 'left-0 opacity-0',
          )}
        />
        <input
          {...rest}
          ref={ref}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={twMerge(
            'h-full w-full pl-5 text-base font-normal transition-all duration-100 outline-none placeholder:text-neutral-600 focus:outline-none',
            isFocused && 'pl-0',
            inputClassName,
          )}
        />
        {inputValue && (
          <X
            size={16}
            onClick={handleReset}
            className="absolute right-5 bottom-1/2 translate-y-2/5 transform cursor-pointer"
          />
        )}
      </div>
    )
  },
)

BigInput.displayName = 'BigInput'

export default BigInput

