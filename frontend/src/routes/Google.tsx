import ConfigPanel from 'components/shared/ConfigPanel'
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
