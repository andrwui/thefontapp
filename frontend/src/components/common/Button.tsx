import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  variant?: 'default' | 'cta' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = 'default', children, className, ...rest }: ButtonProps) => {
  const bgColor =
    variant === 'danger' ? 'bg-red-700' : variant === 'cta' ? 'bg-neutral-950' : 'bg-neutral-300'

  const textColor =
    variant === 'danger' || variant === 'cta' ? 'text-neutral-50' : 'text-neutral-950'

  return (
    <button
      className={`px-3 py-1 rounded-md disabled:brightness-75 hover:brightness-110 cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
