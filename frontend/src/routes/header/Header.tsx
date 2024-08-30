import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className="relative w-full h-full flex flex-row justify-between items-center row-start-1 col-start-1 col-span-2 p-5">
      <p className="font-extrabold text-3xl tracking-tighter">thefontapp</p>
      <SearchBar />
    </div>
  )
}
export default Header
