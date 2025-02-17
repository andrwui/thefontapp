import { useEffect, useCallback, useRef } from 'react'

const useKeybind = (keySeq: string[], cb: () => void) => {
  const pressedKeys = useRef<Set<string>>(new Set())

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key)

      const isMatch =
        keySeq.every((key) => pressedKeys.current.has(key)) &&
        pressedKeys.current.size === keySeq.length

      if (isMatch) {
        cb()
      }
    },
    [keySeq, cb],
  )

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    pressedKeys.current.delete(e.key)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [handleKeydown, handleKeyup])
}

export default useKeybind

