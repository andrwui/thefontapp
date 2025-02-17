import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  variant?: 'default' | 'cta' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = 'default', children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'cursor-pointer rounded-md bg-neutral-900 px-3 py-1 transition-all duration-200 hover:brightness-130',
        variant === 'danger' && 'bg-red-700 font-semibold text-neutral-50',
        variant === 'cta' && 'bg-neutral-50 font-semibold text-neutral-950 hover:brightness-85',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
