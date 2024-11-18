import { Navigate, Route, Routes } from 'react-router-dom'
import Local from 'routes/Local'
import Navigation from 'layout/sidebar/navigation/Navigation'
import SearchBar from 'layout/header/SearchBar'
import AppName from 'layout/header/AppName'

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-mainLayout grid-rows-mainLayout">
      <AppName />
      <Navigation />
      <SearchBar />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              replace
              to="/local"
            />
          }
        />
        <Route
          path="/local"
          element={<Local />}
        />
      </Routes>
    </div>
  )
}

export default Layout
