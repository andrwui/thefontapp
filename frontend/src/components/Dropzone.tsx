import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'

type DropzoneProps = {
  children: React.ReactNode | React.ReactNode[]
}

const Dropzone = ({ children }: DropzoneProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 z-50 grid h-full w-full place-items-center bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex h-fit w-fit flex-col gap-4 rounded-xl bg-neutral-950 px-4 py-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Dropzone
