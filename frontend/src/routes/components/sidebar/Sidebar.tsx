import Filters from './google/Filters'
import Navigation from './navigation/Navigation'
import Sources from './sources/Sources'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { pathname } = useLocation()
  console.log(pathname)

  return (
    <div className="col-start-1 row-start-2 flex flex-col gap-10 bg-neutral-950 py-3">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Navigation />
      </div>
      {pathname.includes('/fonts/local') && (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Sources />
        </div>
      )}
      {pathname.includes('/fonts/google') && (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Filters />
        </div>
      )}
    </div>
  )
}

export default Sidebar
