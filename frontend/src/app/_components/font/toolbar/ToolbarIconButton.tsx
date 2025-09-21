import { FontFocusContext } from '../FontWrapper'
import { ButtonHTMLAttributes, forwardRef, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const ToolbarIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ Icon, className, ...rest }, ref) => {
    const { isFocused } = useContext(FontFocusContext)
    return (
      <button
        ref={ref}
        className="m-0 grid size-4 items-center bg-transparent p-0 disabled:cursor-not-allowed"
        {...rest}
      >
        <Icon
          className={twMerge(
            'size-4 cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100',
            isFocused && 'opacity-100',
            className,
          )}
        />
      </button>
    )
  },
)

export default ToolbarIconButton
