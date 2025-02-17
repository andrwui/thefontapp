import SearchBar from './searchbar/SearchBar'
import AppIcon from 'assets/tfa_logo.svg?react'

const Header = () => {
  return (
    <div className="col-span-2 col-start-1 flex bg-neutral-950">
      <div className="flex w-80 items-center justify-start gap-5 px-10 py-5">
        <AppIcon className="h-8 w-8" />
      </div>
      <div className="flex w-full grow-0 items-center justify-center">
        <SearchBar />
      </div>
    </div>
  )
}

export default Header
