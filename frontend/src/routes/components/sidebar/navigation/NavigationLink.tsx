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
        'group flex h-8 w-5/6 origin-left items-center justify-start gap-3 rounded-md px-5 py-5 font-light text-neutral-50 transition-colors duration-150',
        isCurrentLocation && 'bg-neutral-900',
      )}
    >
      {Icon && Icon}
      {children}
    </Link>
  )
}
export default NavigationLink
