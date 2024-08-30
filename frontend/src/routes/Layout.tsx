import { Navigate, Route, Routes } from 'react-router-dom'
import Browse from './browse/Browse'
import Navigation from './navigation/Navigation'
import Header from './header/Header'
import Test from './tests/Test'

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-mainLayout grid-rows-mainLayout">
      <Navigation />
      <Header />
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
        <Route
          path="/test"
          element={<Test />}
        />
      </Routes>
    </div>
  )
}

export default Layout
