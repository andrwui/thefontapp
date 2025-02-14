import { FontFocusContext } from '../FontWrapper'
import { ButtonHTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

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
      className="m-0 grid size-4 items-center bg-transparent p-0 disabled:cursor-not-allowed"
      {...rest}
    >
      <Icon
        className={twMerge(
          'size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
          isFocused && 'opacity-100',
          className,
        )}
      />
    </button>
  )
}

export default ToolbarIconButton
