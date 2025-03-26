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

  // Add this function to clear all keys when focus changes
  const handleBlur = useCallback(() => {
    pressedKeys.current.clear()
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)
    document.addEventListener('blur', handleBlur, true)
    document.addEventListener('mousedown', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
      document.removeEventListener('blur', handleBlur, true)
      document.removeEventListener('mousedown', handleBlur)
    }
  }, [handleKeydown, handleKeyup, handleBlur])
}

export default useKeybind

