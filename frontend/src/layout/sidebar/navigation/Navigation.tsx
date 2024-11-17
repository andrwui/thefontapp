/// <reference types="vite-plugin-svgr/client" />

import NavigationLink from './NavigationLink'

import BrowseIcon from 'assets/icons/browse.svg?react'
import GoogleIcon from 'assets/icons/google_fonts.svg?react'
import PreviewIcon from 'assets/icons/eye.svg?react'
import SettingsIcon from 'assets/icons/settings.svg?react'
import TestIcon from 'assets/icons/test.svg?react'

const Navigation = () => {
  return (
    <div className="row-start-2 w-full h-full flex flex-col gap-2 px-6 py-4 border-r">
      <NavigationLink
        to="/browse"
        Icon={BrowseIcon}
      >
        Browse
      </NavigationLink>
      <NavigationLink
        to="/google"
        Icon={GoogleIcon}
      >
        Google
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
