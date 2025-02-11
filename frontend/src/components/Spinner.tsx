const Spinner = ({ size }: { size?: 'sm' | 'md' | 'lg' }) => {
  return (
    <div
      className={`animate-spin inline-block border-current border-t-transparent text-950 rounded-full ${size == 'sm' ? 'size-4 border-[1px]' : size == 'lg' ? 'size-9 border-[5px]' : 'size-6 border-[3px]'}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
