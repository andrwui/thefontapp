import { ButtonHTMLAttributes } from 'react'

type IconButtonProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const ToolbarIconButton = ({ Icon, className, ...rest }: IconButtonProps) => {
  return (
    <button
      className={`bg-transparent size-4 p-0 m-0 grid items-center disabled:cursor-not-allowed`}
      {...rest}
    >
      <Icon
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-4 ${className} `}
      />
    </button>
  )
}

export default ToolbarIconButton
