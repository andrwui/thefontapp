import { ChangeEvent } from 'react'
import useSearchStore from '../../stores/useSearchStore'

import CancelIcon from 'assets/icons/cancel.svg?react'

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchStore()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="search fonts"
        className="w-1/3 h-1/2 p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base bg-neutral-900 font-normal rounded-md text-center focus:outline-none placeholder:text-neutral-600"
      />
      {searchValue && (
        <CancelIcon
          onClick={() => setSearchValue('')}
          className="absolute top-1/2 right-1/3 -translate-x-[15px] transform -translate-y-1/2 size-3 cursor-pointer"
        />
      )}
    </>
  )
}

export default SearchBar
