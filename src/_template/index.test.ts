import { describe, expect, it } from 'vitest'
import { useCounter } from '.'

describe('useCounter', () => {
  it('should be defined', () => {
    expect(useCounter).toBeDefined()
  })

  it('should be update counter', () => {
    const { inc, dec, get } = useCounter()

    expect(get()).toBe(0)
    inc()
    expect(get()).toBe(1)
    inc(2)
    expect(get()).toBe(3)
    dec()
    expect(get()).toBe(2)
    dec(5)
  })
})
