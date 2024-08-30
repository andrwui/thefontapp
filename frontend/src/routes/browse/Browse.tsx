import FontList from './fontlist/FontList'
import ConfigPanel from './fontlist/components/configpanel/ConfigPanel'

const Browse = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      <FontList />
      <ConfigPanel />
    </div>
  )
}

export default Browse
