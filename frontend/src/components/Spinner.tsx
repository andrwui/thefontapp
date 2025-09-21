import { Loader } from 'lucide-react'

const Spinner = ({ size }: { size?: number }) => {
  return (
    <Loader
      className="animate-spin"
      size={size}
    />
  )
}

export default Spinner
