import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const NavigationLink = ({
  to,
  Icon,
  children,
}: {
  to: string
  Icon?: ReactNode
  children: any
}) => {
  const curLocation = useLocation().pathname

  const isCurrentLocation = curLocation === to

  return (
    <Link
      to={to}
      className={twMerge(
        'flex w-full items-center justify-start gap-2 px-5 py-1 text-lg text-neutral-400 transition-all duration-150 hover:brightness-150',
        isCurrentLocation && 'font-medium text-neutral-50 hover:brightness-100',
      )}
    >
      {Icon && Icon}
      {children}
    </Link>
  )
}
export default NavigationLink
