import AppIcon from '../assets/tfa_logo.svg?react'
import SearchBar from './components/header/searchbar/SearchBar'
import Sidebar from './components/sidebar/Sidebar'
import Fonts from './fonts/layout'
import useLoadFontFaces from './hooks/useLoadFontFaces'
import Tests from './tests/layout'
import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Google from 'routes/fonts/google/layout'
import { useGoogleFontsStore } from 'routes/fonts/google/stores/GoogleFontsStore'
import Local from 'routes/fonts/local/layout'
import { useLocalFontStore } from 'routes/fonts/local/stores/LocalFontStore'

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
      <div className="col-start-1 col-end-1 flex w-80 items-center justify-start gap-5 px-5">
        <AppIcon className="h-8 w-8" />
      </div>
      <div className="col-start-2 row-span-2 row-start-1 h-full w-full">
        <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to="/fonts/local"
                />
              }
            />
            <Route
              path="/fonts"
              element={<Fonts />}
            >
              <Route
                path="/fonts/local"
                element={<Local />}
              />
              <Route
                path="/fonts/google"
                element={<Google />}
              />
            </Route>
            <Route
              path="/tests"
              element={<Tests />}
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Layout
