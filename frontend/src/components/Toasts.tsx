import { useToaster } from 'react-hot-toast/headless'

const Toasts = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers

  return (
    <div
      className="top-16 right-5 absolute z-50"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map(toast => {
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
            className={`absolute right-0 w-80 transition-all duration-200 ${toast.visible ? 'opacity-100' : 'opacity-0'} bg-neutral-50 border p-5`}
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
