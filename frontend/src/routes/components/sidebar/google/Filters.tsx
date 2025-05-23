import SidebarField from '../components/SidebarField'
import { useGoogleFontsStore } from 'routes/fonts/google/stores/GoogleFontsStore'
import { twMerge } from 'tailwind-merge'

const options = [
  {
    display: 'Sans-serif',
    value: 'sans-serif',
  },
  {
    display: 'Serif',
    value: 'serif',
  },
  {
    display: 'Monospace',
    value: 'monospace',
  },
  {
    display: 'Display',
    value: 'display',
  },
  {
    display: 'Handwriting',
    value: 'handwriting',
  },
]

export default function Filters() {
  const { enabledFilters, toggleFilter, clearFilters } = useGoogleFontsStore()

  return (
    <SidebarField title="Filters">
      <div className="flex w-full items-center justify-between gap-5 pr-5 pb-3">
        <h2 className="">
          Category {enabledFilters.length > 0 ? `(${enabledFilters.length})` : ''}
        </h2>
        {enabledFilters.length != 0 && (
          <button
            className="h-max cursor-pointer text-sm underline"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}
      </div>
      <ul className="flex flex-wrap gap-3 pr-5">
        {options.map((opt) => {
          const selected = enabledFilters.indexOf(opt.value) !== -1
          return (
            <button
              className={twMerge(
                'cursor-pointer rounded-md border-1 border-neutral-400 px-2 py-1 text-neutral-400 hover:border-neutral-300 hover:text-neutral-300',
                selected &&
                  'border-neutral-50 text-neutral-50 hover:border-neutral-50 hover:text-neutral-50',
              )}
              onClick={() => toggleFilter(opt.value)}
            >
              {opt.display}
            </button>
          )
        })}
      </ul>
    </SidebarField>
  )
}
