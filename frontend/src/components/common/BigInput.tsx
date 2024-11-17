import CancelIcon from 'assets/icons/cross.svg?react'

import React, { ChangeEvent, FocusEvent, useState } from 'react'

type BigInputProps = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  inputClassName?: string
} & React.HTMLProps<HTMLInputElement>

const BigInput = ({
  Icon,
  value,
  onBlur,
  onFocus,
  onChange,
  className,
  inputClassName,
  ...rest
}: BigInputProps) => {
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
    <div className={`relative flex items-center w-full h-full px-5 ${className}`}>
      <Icon
        className={`absolute  *:fill-neutral-600 size-4 transition-all duration-100 ${isFocused ? 'opacity-0 left-0' : 'opacity-100 left-5'}`}
      />
      <input
        {...rest}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-full text-base font-normal focus:outline-none outline-none placeholder:text-neutral-600 transition-all duration-100 ${isFocused ? 'pl-0' : 'pl-5'} ${inputClassName}`}
      />
      {inputValue && (
        <CancelIcon
          onClick={handleReset}
          className="absolute right-5 bottom-0 transform -translate-y-4 size-3 cursor-pointer"
        />
      )}
    </div>
  )
}

export default BigInput
