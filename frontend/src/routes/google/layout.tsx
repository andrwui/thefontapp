import ConfigPanel from 'components/vendor/shared/config_panel/ConfigPanel'
import GoogleFontList from 'components/vendor/google/GoogleFontList'

const Google = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto ">
      <GoogleFontList />
      <ConfigPanel />
    </div>
  )
}

export default Google
