import { LucideIcon } from 'lucide-react'
import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type IconSwitchProps = {
  icon: LucideIcon
} & InputHTMLAttributes<HTMLInputElement>
const IconSwitch = ({ icon: Icon, checked, ...rest }: IconSwitchProps) => {
  return (
    <label
      className={twMerge(
        'cursor-pointer rounded-md bg-neutral-900 p-2 transition-all duration-100 active:scale-95',
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
