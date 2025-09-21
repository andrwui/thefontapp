import useOnClickOutside from 'hooks/useOnClickOutside'
import { ChevronDown } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { AnimatePresence } from 'motion/react'
import { ul as MotionUl } from 'motion/react-client'
import { ComponentProps, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type DropdownOption = {
  display: string
  value: any
  icon?: ComponentProps<typeof DynamicIcon>['name']
  disabled?: boolean
}

type DropdownProps = {
  placeholder: string
  options: DropdownOption[]
  value: any
  onChange: (value: any) => void
  hasError?: boolean
  className?: {
    activator?: string
    list?: string
  }
}
const Dropdown = ({
  placeholder,
  options,
  value,
  onChange,
  hasError,
  className,
}: DropdownProps) => {
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
          className && className.activator,
        )}
        onClick={() => setIsOpen((s) => !s)}
      >
        <p className="flex gap-2">
          <span>
            {
              <DynamicIcon
                name={
                  options.find((o) => o.value === value)?.icon as ComponentProps<
                    typeof DynamicIcon
                  >['name']
                }
                size={16}
              />
            }
          </span>
          <span>{options.find((o) => o.value === value)?.display || placeholder}</span>
        </p>
        <ChevronDown
          size={18}
          className={twMerge('min-w-5 transition-all duration-150', isOpen && 'rotate-180')}
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
            className={twMerge(
              'absolute top-5/4 left-0 z-100 flex w-full flex-col overflow-hidden rounded-md bg-neutral-900',
              className && className.list,
            )}
          >
            {options.map((opt) => (
              <li
                onClick={() => !opt.disabled && handleItemClick(opt.value)}
                className={twMerge(
                  'flex cursor-pointer items-center gap-2 bg-inherit p-2.5 font-light text-neutral-50 hover:brightness-150',
                  opt.disabled && 'cursor-not-allowed text-neutral-700 hover:brightness-100',
                )}
              >
                {opt.icon && (
                  <DynamicIcon
                    name={opt.icon}
                    size={16}
                  />
                )}
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
