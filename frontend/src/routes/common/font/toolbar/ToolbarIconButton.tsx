import { ButtonHTMLAttributes, useContext } from 'react'
import { FontFocusContext } from '../FontWrapper'

type IconButtonProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const ToolbarIconButton = ({ Icon, className, ...rest }: IconButtonProps) => {
  const { isFocused, setIsFocused } = useContext(FontFocusContext)
  return (
    <button
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`bg-transparent size-4 p-0 m-0 grid items-center disabled:cursor-not-allowed`}
      {...rest}
    >
      <Icon
        className={`opacity-0 transition-opacity duration-200 size-4 ${className} ${isFocused ? 'opacity-100' : 'group-hover:opacity-100'}`}
      />
    </button>
  )
}

export default ToolbarIconButton
