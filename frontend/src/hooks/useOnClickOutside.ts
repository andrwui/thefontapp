import { useEffect, type RefObject } from 'react'

function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  activatorRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activatorRef &&
        activatorRef.current &&
        activatorRef.current.contains(event.target as Node)
      ) {
        return
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export default useOnClickOutside
