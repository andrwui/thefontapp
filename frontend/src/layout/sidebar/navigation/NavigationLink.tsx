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
      className={`group w-full h-8 text-lg flex gap-3 px-5 py-5 items-center justify-start font-medium origin-left transition-colors duration-100 border-b
        ${isCurrentLocation ? 'bg-neutral-900 text-neutral-50 font-bold' : 'text-neutral-950'}
        `}
    >
      {Icon && (
        <Icon
          className={`*:transition-colors duration-100
            ${isCurrentLocation ? '*:fill-neutral-50 group-hover:*:fill-neutral-50 font-bold' : '*:fill-neutral-950'}
            `}
        />
      )}
      <p className="leading-5">{children}</p>
    </Link>
  )
}
export default NavigationLink
