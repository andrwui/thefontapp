import RouteContainer from 'routes/components/RouteContainer'
import GoogleFontList from 'routes/fonts/google/components/GoogleFontList'

const Google = () => {
  return (
    <RouteContainer>
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <GoogleFontList />
      </div>
    </RouteContainer>
  )
}

export default Google
