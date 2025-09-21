import ConfigPanel from '@/app/_components/config_panel/ConfigPanel'
import SearchBar from '@/app/_components/header/searchbar/SearchBar'
import { ReactNode } from 'react'

export default function Fonts({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <SearchBar />
      {children}
      <ConfigPanel />
    </div>
  )
}
