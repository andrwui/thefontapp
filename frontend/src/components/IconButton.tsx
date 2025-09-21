import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = ({ Icon, className, ...rest }: IconButtonProps) => {
  return (
    <button
      className={`m-0 grid size-4 items-center p-0 disabled:cursor-not-allowed`}
      {...rest}
    >
      <Icon className={twMerge('size-4', className)} />
    </button>
  )
}

export default IconButton
