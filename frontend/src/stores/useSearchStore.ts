import { create } from 'zustand'

type SearchStore = {
	searchValue: string
	setSearchValue: (searchValue: string) => void
}

const useSearchStore = create<SearchStore>(set => ({
	searchValue: '',
	setSearchValue: (searchValue: string) => set({ searchValue }),
}))

export default useSearchStore
