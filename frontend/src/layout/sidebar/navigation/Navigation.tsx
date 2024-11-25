/// <reference types="vite-plugin-svgr/client" />

import NavigationLink from './NavigationLink'

import BrowseIcon from 'assets/icons/browse.svg?react'
import GoogleIcon from 'assets/icons/google_fonts.svg?react'
import PreviewIcon from 'assets/icons/eye.svg?react'
import SettingsIcon from 'assets/icons/settings.svg?react'
import TestIcon from 'assets/icons/test.svg?react'
import { useLocalFontStore } from 'stores/LocalFontStore'
import { useGoogleFontsStore } from 'stores/GoogleFontsStore'

const Navigation = () => {
  const { localFonts } = useLocalFontStore()
  const { googleFonts } = useGoogleFontsStore()

  return (
    <div className="row-start-2 w-full h-full flex flex-col border-r">
      <NavigationLink
        to="/local"
        Icon={BrowseIcon}
      >
        <div className="flex justify-between w-full">
          <p>Local</p>
          <p className="font-thin">{localFonts.length}</p>
        </div>
      </NavigationLink>
      <NavigationLink
        to="/google"
        Icon={GoogleIcon}
      >
        <div className="flex justify-between w-full">
          <p>Google</p>
          <p className="font-thin">{googleFonts.length}</p>
        </div>
      </NavigationLink>
      <NavigationLink
        to="/preview"
        Icon={PreviewIcon}
      >
        Preview
      </NavigationLink>
      <NavigationLink
        to="/settings"
        Icon={SettingsIcon}
      >
        Settings
      </NavigationLink>
      <NavigationLink
        to="/test"
        Icon={TestIcon}
      >
        Test
      </NavigationLink>
    </div>
  )
}
export default Navigation
