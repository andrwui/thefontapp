import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  variant?: 'default' | 'cta' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = 'default', children, className, ...rest }: ButtonProps) => {
  const styles = {
    default:
      'cursor-pointer rounded-md bg-neutral-900 px-3 py-1 transition-all duration-200 hover:brightness-125 disabled:cursor-not-allowed disabled:hover:brightness-100',
    cta: 'bg-neutral-50 font-semibold text-neutral-950 hover:brightness-85 disabled:bg-neutral-900 disabled:text-neutral-800',
    danger: 'bg-red-700 font-semibold text-neutral-50',
  }

  return (
    <button
      className={twMerge(styles.default, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
