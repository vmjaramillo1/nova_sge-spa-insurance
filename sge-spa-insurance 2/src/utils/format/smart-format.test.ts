import smartFormats from './smart-format'

describe('smart-format', () => {
  it('should format money', () => {
    const result = smartFormats.toMoney('1223.23', '2', 'true')
    expect(result).toEqual('$ 1.223,23')
  })

  it('should format money return $ 0,00 when value is empty', () => {
    const result = smartFormats.toMoney('', '3', 'false')
    expect(result).toEqual('$ 0,000')
  })

  it('should format date', () => {
    const result = smartFormats.toDate('2023-06-08T16:01:16')

    expect(result).toEqual('8 jun. 2023')
  })

  it('should format date return empty string when value is empty', () => {
    const result = smartFormats.toDate('')

    expect(result).toEqual('')
  })
})
