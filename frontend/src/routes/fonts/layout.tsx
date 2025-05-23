import { Outlet } from 'react-router-dom'
import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import SearchBar from 'routes/components/header/searchbar/SearchBar'

const Fonts = () => {
  return (
    <div className="flex h-full flex-col">
      <SearchBar />
      <Outlet />
      <ConfigPanel />
    </div>
  )
}

export default Fonts
