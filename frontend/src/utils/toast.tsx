import { Check } from 'lucide-react'
import { toast as hotToast } from 'react-hot-toast/headless'

const toast = {
  correct: (message: string) =>
    hotToast(
      <div className="flex items-center gap-2">
        <Check size={18} />
        {message}
      </div>,
    ),
}

export default toast
