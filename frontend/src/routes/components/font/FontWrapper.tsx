import { createContext, Dispatch, ReactElement, SetStateAction, useState } from 'react'

export const FontFocusContext = createContext(
  {} as { isFocused: boolean; setIsFocused: Dispatch<SetStateAction<boolean>> },
)
const FontWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <FontFocusContext.Provider value={{ isFocused, setIsFocused }}>
      <div className="group flex w-full flex-col px-5 py-5 text-nowrap text-neutral-50 selection:bg-neutral-50 selection:text-neutral-950">
        {children}
      </div>
    </FontFocusContext.Provider>
  )
}

export default FontWrapper
