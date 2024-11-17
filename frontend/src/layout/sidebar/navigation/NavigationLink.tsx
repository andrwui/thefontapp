import { Link, useLocation } from 'react-router-dom'

const NavigationLink = ({
  to,
  Icon,
  children,
}: {
  to: string
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  children: string
}) => {
  const curLocation = useLocation().pathname

  console.log(curLocation)

  const isCurrentLocation = curLocation === to

  return (
    <Link
      to={to}
      className={`group w-full h-8 text-lg flex gap-3 px-2 rounded-sm items-center justify-start font-medium origin-left transition-colors duration-100
        ${isCurrentLocation ? 'bg-neutral-900 text-neutral-50 font-bold' : 'text-neutral-600 hover:text-neutral-950'}
        `}
    >
      {Icon && (
        <Icon
          className={`*:transition-colors duration-100
            ${isCurrentLocation ? '*:fill-neutral-50 group-hover:*:fill-neutral-50 font-bold' : '*:fill-neutral-600 group-hover:*:fill-neutral-800'}
            `}
        />
      )}
      <p className="leading-5">{children}</p>
    </Link>
  )
}
export default NavigationLink
