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
    console.log('PIJASO')
    const nextIndex = (currentIndex + 1) % options.length
    setCurrentIndex(nextIndex)

    onClick(options[nextIndex].value)
  }

  return (
    <button
      className="w-20 aspect-square grid place-items-center"
      onClick={handleClick}
    >
      {options[currentIndex].icon}
    </button>
  )
}

export default CyclerButton
