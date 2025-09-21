import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import { MouseEvent, ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
}

const Tooltip = ({ children, content, position, delay }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseEnter(e: MouseEvent) {
    setMousePosition({ x: e.clientX, y: e.clientY })
    const newTimeoutId = setTimeout(() => {
      setVisible(true)
    }, delay || 500)
    setTimeoutId(newTimeoutId)
  }

  function handleMouseLeave() {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setVisible(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: mousePosition.x, top: mousePosition.y }}
              className={`pointer-events-none absolute z-50 flex h-max w-max max-w-80 -translate-x-1/2 -translate-y-[150%] flex-col gap-2 rounded-lg border-1 border-neutral-900 bg-neutral-950 p-2 before:absolute before:bottom-[-20%] before:left-[50%] before:size-4 before:-translate-x-1/2 before:rotate-45 before:border-r before:border-b before:border-r-neutral-900 before:border-b-neutral-900 before:bg-neutral-950 before:content-[""]`}
            >
              <p className="h-max text-pretty">{content}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export default Tooltip
