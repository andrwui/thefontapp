import { Navigate, Route, Routes } from 'react-router-dom'
import Browse from './routes/Browse'
import Navigation from './sidebar/navigation/Navigation'
import SearchBar from './header/SearchBar'
import AppName from './header/AppName'

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
              to="/browse"
            />
          }
        />
        <Route
          path="/browse"
          element={<Browse />}
        />
      </Routes>
    </div>
  )
}

export default Layout
