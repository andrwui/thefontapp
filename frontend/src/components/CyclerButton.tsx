import { ReactElement, useState } from 'react'

type CyclerButtonOption = {
  icon: ReactElement
  value: string | number | boolean
}

type CyclerButtonProps = {
  options: CyclerButtonOption[]
  onClick: (_: any) => void
}

const CyclerButton = ({ options, onClick }: CyclerButtonProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % options.length
    setCurrentIndex(nextIndex)

    onClick(options[nextIndex].value)
  }

  return (
    <button
      className="grid aspect-square w-20 place-items-center p-2"
      onClick={handleClick}
    >
      {options[currentIndex].icon}
    </button>
  )
}

export default CyclerButton
