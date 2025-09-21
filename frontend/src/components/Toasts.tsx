import { useToaster } from 'react-hot-toast/headless'
import { twMerge } from 'tailwind-merge'

const Toasts = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers

  return (
    <div
      className="absolute top-16 right-5 z-50"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 5,
        })

        const ref = (el: HTMLDivElement) => {
          if (el && typeof toast.height !== 'number') {
            const height = el.getBoundingClientRect().height
            updateHeight(toast.id, height)
          }
        }
        return (
          <div
            key={toast.id}
            ref={ref}
            className={twMerge(
              'absolute right-0 w-max rounded-md bg-neutral-900 p-5 opacity-0 transition-all duration-200',
              toast.visible && 'opacity-100',
            )}
            style={{
              transform: `translateY(${offset}px)`,
            }}
            {...toast.ariaProps}
          >
            {/* @ts-expect-error not sure why wont they update the documentation, this type is crazy and doesnt't appear anywhere*/}
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}

export default Toasts
