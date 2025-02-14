import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import useLoadFontFaces from './hooks/useLoadFontFaces'
import Tests from './tests/layout'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Google from 'routes/google/layout'
import { useGoogleFontsStore } from 'routes/google/stores/GoogleFontsStore'
import Local from 'routes/local/layout'
import { useLocalFontStore } from 'routes/local/stores/LocalFontStore'

const Layout = () => {
  const { getGoogleFonts } = useGoogleFontsStore()
  const { getLocalFonts, localFonts } = useLocalFontStore()

  useLoadFontFaces(localFonts)

  useEffect(() => {
    getLocalFonts()
  }, [getLocalFonts])

  useEffect(() => {
    getGoogleFonts()
  }, [getGoogleFonts])

  return (
    <div className="grid h-screen w-screen grid-cols-[var(--main-layout-cols)] grid-rows-[var(--main-layout-rows)]">
      <Sidebar />
      <Header />
      <div className="col-start-2 row-start-2 h-full w-full">
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
          <Route
            path="/google"
            element={<Google />}
          />
          <Route
            path="/tests"
            element={<Tests />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default Layout
