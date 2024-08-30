/// <reference types="vite-plugin-svgr/client" />

import NavigationLink from './components/NavigationLink'

import BrowseIcon from 'assets/icons/browse.svg?react'
import GoogleIcon from 'assets/icons/google.svg?react'
import PreviewIcon from 'assets/icons/preview.svg?react'
import SettingsIcon from 'assets/icons/settings.svg?react'

const Navigation = () => {
  return (
    <div className="w-full h-full row-start-2 flex flex-col gap-3 p-5">
      <NavigationLink
        to="/browse"
        icon={<BrowseIcon />}
      >
        browse
      </NavigationLink>
      <NavigationLink
        to="/google"
        icon={<GoogleIcon />}
      >
        google
      </NavigationLink>
      <NavigationLink
        to="/preview"
        icon={<PreviewIcon />}
      >
        preview
      </NavigationLink>
      <NavigationLink
        to="/settings"
        icon={<SettingsIcon />}
      >
        settings
      </NavigationLink>
      <NavigationLink to="/test">test</NavigationLink>
    </div>
  )
}
export default Navigation
