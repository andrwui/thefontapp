import { ButtonHTMLAttributes } from 'react'

type IconButtonProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = ({ Icon, className, ...rest }: IconButtonProps) => {
  return (
    <button
      className={`size-4 p-0 m-0 grid items-center disabled:cursor-not-allowed`}
      {...rest}
    >
      <Icon className={`size-4 ${className}`} />
    </button>
  )
}

export default IconButton
