import BigInput from 'components/BigInput'
import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'
import useSearchStore from 'routes/stores/useSearchStore'

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchStore()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <BigInput
      floating
      icon={Search}
      onChange={handleInputChange}
      value={searchValue}
      placeholder="Search fonts"
      className="h-4/6 w-180"
    />
  )
}

export default SearchBar
