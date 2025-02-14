import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import { twMerge } from 'tailwind-merge'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const Dialog = ({ isOpen, onClose, children, className }: DialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={twMerge('h-fit w-max rounded-lg bg-neutral-950 px-4 py-4', className)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Dialog
