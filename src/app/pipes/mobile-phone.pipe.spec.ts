import { MobilePhonePipe } from './mobile-phone.pipe'

describe('MobilePhonePipe', () => {
  it('create an instance', () => {
    const pipe = new MobilePhonePipe()
    expect(pipe).toBeTruthy()
  })

  it('transform()', () => {
    const pipe = new MobilePhonePipe()
    const result = pipe.transform('9876543210')

    const testPhone = '+7 (987) 654-32-10'
    const result2 = pipe.transform(testPhone)

    expect(result).toBeTruthy()
    expect(result2).toEqual(testPhone)
  })
})
