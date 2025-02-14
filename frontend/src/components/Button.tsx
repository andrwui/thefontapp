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
        variant === 'danger' && 'bg-red-700 text-neutral-50 hover:brightness-130',
        variant === 'cta' && 'bg-neutral-50 text-neutral-950',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
