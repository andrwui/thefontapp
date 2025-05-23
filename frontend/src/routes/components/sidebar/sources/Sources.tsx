import SidebarField from '../components/SidebarField'
import { GetLocalFontDirectories } from 'go/main/App'
import { sources } from 'go/models'
import { Plus } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DynamicIconName } from 'types'

const Sources = () => {
  const [fontSources, setFontSources] = useState<sources.Source[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    GetLocalFontDirectories().then(setFontSources).catch(console.log)
  }, [])

  return (
    <SidebarField title="Sources">
      <>
        {fontSources.map((source) => (
          <div className="mb-1 flex cursor-pointer items-center justify-start gap-2 pl-5 font-light text-neutral-400 hover:text-neutral-50">
            <DynamicIcon
              name={source.icon as DynamicIconName}
              size={14}
            />
            <p className="">{source.name}</p>
          </div>
        ))}
        <button className="flex cursor-pointer items-center justify-start gap-2 pl-5 font-light text-neutral-400 hover:text-neutral-50">
          <Plus size={14} />
          <p>Add new source</p>
        </button>
      </>
    </SidebarField>
  )
}
export default Sources
