import useOnClickOutside from 'hooks/useOnClickOutside'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { ul as MotionUl } from 'motion/react-client'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type DropdownOption = {
  display: string
  value: any
}

type DropdownProps = {
  placeholder: string
  options: DropdownOption[]
  value: any
  onChange: (value: any) => void
  hasError?: boolean
}
const Dropdown = ({ placeholder, options, value, onChange, hasError }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const activatorRef = useRef(null)
  const dropdownRef = useRef(null)

  useOnClickOutside(dropdownRef, () => setIsOpen(false), activatorRef)

  const handleItemClick = (val: any) => {
    setIsOpen((s) => !s)
    onChange(val)
  }

  return (
    <div className="relative w-full">
      <button
        ref={activatorRef}
        className={twMerge(
          'flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-2 font-normal',
          !(value.trim() !== '') && 'text-neutral-500',
          hasError && 'border-red-500',
          !options.find((o) => o.value === value)?.display && 'text-neutral-700',
        )}
        onClick={() => setIsOpen((s) => !s)}
      >
        <p className="truncate">{options.find((o) => o.value === value)?.display || placeholder}</p>
        <ChevronDown
          size={18}
          className={twMerge('min-w-5 transition-all duration-75', isOpen && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionUl
            initial={{ height: 0 }}
            animate={{ height: 'max-content' }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.2,
            }}
            ref={dropdownRef}
            className="absolute top-5/4 left-0 z-100 flex w-full flex-col overflow-hidden rounded-md bg-neutral-900"
          >
            {options.map((opt) => (
              <li
                onClick={() => handleItemClick(opt.value)}
                className="flex cursor-pointer items-center bg-inherit p-2.5 font-light text-neutral-50 hover:brightness-150"
              >
                {opt.display}
              </li>
            ))}
          </MotionUl>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
