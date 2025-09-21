export function findClosest(arr: number[], target: number) {
  if (!arr || arr.length === 0) {
    return null
  }

  let closest = arr[0]
  let minDiff = Math.abs(arr[0] - target)

  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - target)
    if (diff < minDiff) {
      minDiff = diff
      closest = arr[i]
    }
  }

  return closest
}
