import { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavigationLink = ({
  to,
  icon,
  children,
}: {
  to: string
  icon?: ReactElement
  children: string
}) => {
  const curLocation = useLocation().pathname

  console.log(curLocation)

  const isCurrentLocation = curLocation === to

  return (
    <Link
      to={to}
      className={`w-full flex gap-2 items-center justify-start font-extrabold text-xl origin-left transition-transform duration-75 ${!isCurrentLocation ? 'hover:scale-110' : 'scale-125'} `}
    >
      {icon && icon}
      <p className="leading-5">{children}</p>
    </Link>
  )
}
export default NavigationLink
