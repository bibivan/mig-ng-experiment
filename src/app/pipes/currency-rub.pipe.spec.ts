import { CurrencyRubPipe } from './currency-rub.pipe'

describe('CurrencyRubPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyRubPipe()
    expect(pipe).toBeTruthy()
  })

  it('transform()', () => {
    const pipe = new CurrencyRubPipe()

    const res = pipe.transform(100000)
    const resNull = pipe.transform(null)

    expect(res).toContain('₽')
    expect(resNull).toBeFalsy()
  })
})
