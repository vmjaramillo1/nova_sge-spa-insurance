import { formatMoney } from './formats'

describe('format', () => {
  it('should return default value by incorrect type', () => {
    const resultArray = formatMoney([] as never)
    const resultObj = formatMoney({} as never)
    const resultBool = formatMoney(true as never)
    const resultNaN = formatMoney(NaN as never)
    const resultSymbol = formatMoney(Symbol() as never)
    const resultFunction = formatMoney((() => null) as never)

    expect(resultArray).toBe('$ 0,00')
    expect(resultObj).toBe('$ 0,00')
    expect(resultBool).toBe('$ 0,00')
    expect(resultNaN).toBe('$ 0,00')
    expect(resultSymbol).toBe('$ 0,00')
    expect(resultFunction).toBe('$ 0,00')
  })

  it('should return default value by falsy value', () => {
    const resultUndefined = formatMoney(undefined as never)
    const resultNull = formatMoney(null as never)
    const resultEmpty = formatMoney('' as never)
    const resultZero = formatMoney(0 as never)

    expect(resultUndefined).toBe('$ 0,00')
    expect(resultNull).toBe('$ 0,00')
    expect(resultEmpty).toBe('$ 0,00')
    expect(resultZero).toBe('$ 0,00')
  })

  it('should return formatted value', () => {
    const result = formatMoney(1000)

    expect(result).toBe('$ 1.000,00')
  })

  it('should return formatted value with custom decimal', () => {
    const result = formatMoney(1000, 3)

    expect(result).toBe('$ 1.000,000')
  })

  it('should return formatted value with custom thousands separator', () => {
    const result = formatMoney(1000, 2, false)

    expect(result).toBe('$ 1000,00')
  })

  it('should return formatted value with custom decimal and thousands separator', () => {
    const result = formatMoney(1000, 3, false)

    expect(result).toBe('$ 1000,000')
  })

  it('should return formatted value with thousands', () => {
    const result = formatMoney(1000000000.99)

    expect(result).toBe('$ 1.000.000.000,99')
  })
})
