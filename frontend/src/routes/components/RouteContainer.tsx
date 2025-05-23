import * as motion from 'motion/react-client'
import { ReactNode } from 'react'

const RouteContainer = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="h-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default RouteContainer
