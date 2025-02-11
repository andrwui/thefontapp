import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'

type DropzoneProps = {
  children: React.ReactNode | React.ReactNode[]
}

const Dropzone = ({ children }: DropzoneProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="z-50 fixed h-full w-full top-0 left-0 bg-black bg-opacity-70 grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-fit h-fit px-4 py-4 bg-neutral-50 rounded-md flex flex-col gap-4"
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
