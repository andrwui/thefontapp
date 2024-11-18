import { ChangeEvent } from 'react'
import useSearchStore from 'stores/useSearchStore'
import SearchIcon from 'assets/icons/magnifying_glass.svg?react'
import BigInput from 'components/common/BigInput'

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchStore()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <BigInput
      Icon={SearchIcon}
      onChange={handleInputChange}
      value={searchValue}
      placeholder={'Search'}
      className={'border-b'}
    />
  )
}

export default SearchBar
