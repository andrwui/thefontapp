import { useMousePos } from 'hooks/useMousePos'
import { Info } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'

type TitleContent = {
  title: ReactNode
  info: ReactNode
}

type TooltipContextProps = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>

  content: { title: ReactNode; info: ReactNode }
  setContent: Dispatch<SetStateAction<TitleContent>>
}

export const TooltipContext = createContext<TooltipContextProps>({
  visible: false,
  setVisible: () => {},
  content: { title: '', info: '' },
  setContent: () => {},
})

export const TooltipContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [content, setContent] = useState<TitleContent>({} as TitleContent)

  return (
    <TooltipContext.Provider
      value={{
        visible,
        setVisible,
        content,
        setContent,
      }}
    >
      <Tooltip />
      {children}
    </TooltipContext.Provider>
  )
}

export const useTooltip = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const { setContent, setVisible } = useContext(TooltipContext)

  const showTooltip = (newContent: TitleContent, delay?: number) => {
    setContent(newContent)
    const newTimeoutId = setTimeout(() => {
      setVisible(true)
    }, delay || 500)
    setTimeoutId(newTimeoutId)
  }

  const hideTooltip = () => {
    setContent({} as TitleContent)
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setVisible(false)
  }

  return { showTooltip, hideTooltip }
}

const Tooltip = () => {
  const { visible, content } = useContext(TooltipContext)
  const { x, y } = useMousePos()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, top: y, left: x }}
          animate={{ opacity: 1, top: y, left: x }}
          exit={{ opacity: 0, top: y, left: x }}
          className="pointer-events-none absolute z-50 flex h-max w-max max-w-80 -translate-x-1/2 -translate-y-[110%] flex-col gap-2 rounded-lg border-1 border-neutral-900 bg-neutral-950 p-2"
        >
          <p className="h-max text-pretty">{content.info}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default Tooltip
