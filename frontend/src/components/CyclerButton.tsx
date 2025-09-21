import { ReactElement } from 'react'

type CyclerButtonOption = {
  icon: ReactElement
  value: string | number | boolean
}

type CyclerButtonProps = {
  options: CyclerButtonOption[]
  value: string | number | boolean
  onChange: (value: any) => void
}

const CyclerButton = ({ options, value, onChange }: CyclerButtonProps) => {
  const currentIndex = options.findIndex((option) => option.value === value)

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % options.length
    onChange(options[nextIndex].value)
  }

  const displayIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <button
      className="grid aspect-square w-20 cursor-pointer place-items-center rounded-sm bg-neutral-900 p-2 active:scale-95"
      onClick={handleClick}
    >
      {options[displayIndex].icon}
    </button>
  )
}

export default CyclerButton
