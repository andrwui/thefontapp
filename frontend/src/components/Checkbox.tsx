import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = {} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

const Checkbox = ({ onCheckedChange, checked, className, ...rest }: CheckboxProps) => {
  return (
    <RadixCheckbox.Root
      {...rest}
      className={twMerge(
        'flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-neutral-800 bg-neutral-900 transition-all duration-100 hover:brightness-125 active:brightness-125',
        checked && 'bg-neutral-50 active:brightness-75',
        className,
      )}
      onCheckedChange={onCheckedChange}
      checked={checked}
    >
      <RadixCheckbox.Indicator>
        <Check
          size={15}
          className={twMerge('*:stroke-neutral-50', checked && '*:stroke-neutral-950')}
        />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}

export default Checkbox
