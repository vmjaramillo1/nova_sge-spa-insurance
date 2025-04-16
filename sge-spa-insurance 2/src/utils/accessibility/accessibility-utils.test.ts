import {
  getAriaAccountLabel,
  getAriaAccountMoney,
  getAriaAccountNumber,
  getAriaNumber,
  getMoneyAriaLabel,
} from './accessibility-utils'

describe('getAriaAccountNumber', () => {
  it('should return aria account number', () => {
    const result = getAriaAccountNumber('******7890')

    expect(result).toBe('7 8 9 0')
  })
})

describe('getAriaAccountMoney', () => {
  it('should return aria account money', () => {
    const result = getAriaAccountMoney(1234.56)

    expect(result).toBe('1234 dólares con 56 centavos')
  })

  it('should return aria account money without cents', () => {
    const result = getAriaAccountMoney(1234)

    expect(result).toBe('1234 dólares')
  })
})

describe('getAriaAccountLabel', () => {
  it('should return aria account label', () => {
    const result = getAriaAccountLabel('CHECKING_ACCOUNT', 'My Checking Account')

    expect(result).toBe('corriente my checking account')
  })
})

describe('getMoneyAriaLabel', () => {
  it('should return aria money label', () => {
    const result = getMoneyAriaLabel(1234)

    expect(result).toBe('1234 dólares')
  })

  it('should return aria money label with cents', () => {
    const result = getMoneyAriaLabel(1234.56)

    expect(result).toBe('1234 dólares con 56 centavos')
  })

  it('should return aria money label when args are string', () => {
    const result = getMoneyAriaLabel('1234')

    expect(result).toBe('1234 dólares')
  })

  it('should return aria money label with cents when args are string', () => {
    const result = getMoneyAriaLabel('1234.56')

    expect(result).toBe('1234 dólares con 56 centavos')
  })

  it('should return aria money label when args are string with commas', () => {
    const result = getMoneyAriaLabel(123.09)

    expect(result).toBe('123 dólares con 9 centavos')
  })
})

describe('getAriaNumber', () => {
  it('should return aria number', () => {
    const result = getAriaNumber('123456')

    expect(result).toBe('1 2 3 4 5 6')
  })
})
