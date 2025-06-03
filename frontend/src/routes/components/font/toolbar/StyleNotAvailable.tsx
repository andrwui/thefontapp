import { AlertTriangle } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import useFontSettingsStore from 'routes/stores/useFontSettingsStore'

export default function StyleNotAvailable({
  availableItalics,
  availableWeights,
}: {
  availableItalics: number[]
  availableWeights: number[]
}) {
  const { fontWeight, fontItalic } = useFontSettingsStore()

  const message = `This font does not support the weight ${fontWeight}${fontItalic ? ' in italic' : ''}.`

  const show =
    !availableWeights.includes(fontWeight) || (fontItalic && !availableItalics.includes(fontWeight))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <AlertTriangle
            size={15}
            className="text-neutral-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
