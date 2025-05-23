import { useEffect, useState } from 'react'

export const useMousePos = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.x, y: e.y })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { ...mousePos }
}
