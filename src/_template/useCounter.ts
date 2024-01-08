export default function useCounter(initialValue = 0) {
    let count = initialValue
    const inc = (delta = 1) => (count += delta)
    const dec = (delta = 1) => (count -= delta)
    const get = () => count
  
    return { inc, dec, get }
  }