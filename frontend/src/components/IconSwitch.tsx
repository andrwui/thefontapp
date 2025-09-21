import { LucideIcon } from 'lucide-react'
import { InputHTMLAttributes, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type IconSwitchProps = {
  icon: LucideIcon
} & InputHTMLAttributes<HTMLInputElement>
const IconSwitch = ({ icon: Icon, checked, ...rest }: IconSwitchProps) => {
  const iconRef = useRef<HTMLLabelElement>(null)

  return (
    <label
      ref={iconRef}
      className={twMerge(
        'cursor-pointer rounded-sm bg-neutral-900 p-2 transition-all duration-100 active:scale-95',
        checked && 'bg-neutral-50',
      )}
    >
      <input
        type="checkbox"
        className="hidden"
        {...rest}
      />

      <Icon
        className={twMerge('*:transition-all *:duration-100', checked && '*:stroke-neutral-950')}
      />
    </label>
  )
}

export default IconSwitch
