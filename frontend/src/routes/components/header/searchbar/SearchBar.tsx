import BigInput from 'components/BigInput'
import useKeybind from 'hooks/useKeybind'
import { Search } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import useSearchStore from 'routes/stores/useSearchStore'

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const handleInputReset = () => {
    setSearchValue('')
  }

  useKeybind(['Control', 'l'], () => {
    inputRef.current?.focus()
  })

  return (
    <BigInput
      ref={inputRef}
      floating
      icon={Search}
      onChange={handleInputChange}
      onReset={handleInputReset}
      value={searchValue}
      placeholder="Search fonts"
      className="h-15 w-full rounded-none border-none bg-transparent"
    />
  )
}

export default SearchBar
