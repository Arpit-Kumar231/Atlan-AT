import { describe, it, expect } from 'vitest'
import { addMinutesToTime } from '../time'

describe('addMinutesToTime', () => {
  it('should add minutes correctly', () => {
    expect(addMinutesToTime('09:00', 30)).toBe('09:30')
    expect(addMinutesToTime('09:00', 60)).toBe('10:00')
    expect(addMinutesToTime('23:30', 30)).toBe('24:00')
  })

  it('should handle hour overflow', () => {
    expect(addMinutesToTime('09:45', 20)).toBe('10:05')
    expect(addMinutesToTime('23:59', 1)).toBe('24:00')
  })
})

