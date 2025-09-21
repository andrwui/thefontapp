import { Check, Loader, X } from 'lucide-react'
import { ReactNode } from 'react'
import { toast as hotToast } from 'react-hot-toast/headless'

const toast = {
  loading: (message: ReactNode, id?: string) =>
    hotToast(
      <div className="flex items-center gap-2">
        <Loader
          size={18}
          className="animate-spin"
        />
        {message}
      </div>,
      { id },
    ),
  success: (message: ReactNode, id?: string) =>
    hotToast(
      <div className="flex items-center gap-2">
        <Check size={18} />
        {message}
      </div>,
      { id },
    ),

  error: (message: ReactNode, id?: string) =>
    hotToast(
      <div className="flex items-center gap-2">
        <X size={18} />
        {message}
      </div>,
      { id },
    ),
}

export default toast
