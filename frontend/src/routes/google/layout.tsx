import ConfigPanel from 'routes/components/config_panel/ConfigPanel'
import GoogleFontList from 'routes/google/components/GoogleFontList'

const Google = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <GoogleFontList />
      <ConfigPanel />
    </div>
  )
}

export default Google
