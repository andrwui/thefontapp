import { ReactElement } from 'react'

const FontWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className="group flex flex-col w-full py-5 px-5 text-nowrap selection:bg-neutral-950 selection:text-neutral-50">
      {children}
    </div>
  )
}

export default FontWrapper
