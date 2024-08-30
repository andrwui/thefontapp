import Slider from '../../components/Slider'

const Test = () => {
  return (
    <div className="h-full w-full">
      <Slider
        min={100}
        max={1000}
        step={100}
      />
    </div>
  )
}
export default Test
