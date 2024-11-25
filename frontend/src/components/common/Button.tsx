import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  variant?: 'default' | 'cta' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = 'default', children, className, ...rest }: ButtonProps) => {
  const variantStyles =
    variant === 'danger'
      ? 'bg-red-700 text-neutral-50 hover:brightness-90 '
      : variant === 'cta'
        ? 'bg-neutral-950 text-neutral-50'
        : 'bg-neutral-50 border hover:brightness-90'

  return (
    <button
      className={`px-3 py-1 cursor-pointer transition-all duration-200 ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
