import { TimerTimePipe } from './timer-time.pipe'

describe('TimerTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimerTimePipe()
    expect(pipe).toBeTruthy()
  })

  it('transform()', () => {
    const pipe = new TimerTimePipe()

    const result = pipe.transform(null)
    const result2 = pipe.transform(100)
    const result3 = pipe.transform(10)

    expect(result).toBe('')
    expect(result2).toContain('мин.')
    expect(result3).toContain('сек.')
  })
})
