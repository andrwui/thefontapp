/// <reference types="vite-plugin-svgr/client" />
import NavigationLink from './NavigationLink'
import { Eye, FileStack, Globe, Settings, TestTube } from 'lucide-react'
import { useGoogleFontsStore } from 'routes/google/stores/GoogleFontsStore'
import { useLocalFontStore } from 'routes/local/stores/LocalFontStore'

const Navigation = () => {
  const { localFonts } = useLocalFontStore()
  const { googleFonts } = useGoogleFontsStore()

  return (
    <div className="col-start-1 row-start-2 flex h-max w-full flex-col items-center gap-1">
      <NavigationLink
        to="/local"
        Icon={<FileStack size={16} />}
      >
        <div className="flex w-full justify-between">
          <p>Local</p>
          <p className="font-thin">{localFonts.length}</p>
        </div>
      </NavigationLink>
      <NavigationLink
        to="/google"
        Icon={<Globe size={16} />}
      >
        <div className="flex w-full justify-between">
          <p>Google</p>
          <p className="font-thin">{googleFonts.length}</p>
        </div>
      </NavigationLink>
      {/* <NavigationLink
        to="/preview"
        Icon={<Eye size={16} />}
      >
        Preview
      </NavigationLink>
      <NavigationLink
        to="/settings"
        Icon={<Settings size={16} />}
      >
        Settings
      </NavigationLink>*/}
      <NavigationLink
        to="/tests"
        Icon={<TestTube size={16} />}
      >
        Tests
      </NavigationLink>
    </div>
  )
}
export default Navigation
