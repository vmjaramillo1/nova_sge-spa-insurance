import { isSuccessResponse } from '.'

describe('response', () => {
  describe('isSuccessResponse', () => {
    it('should return false if code not equals 0 or message not equals Ok', () => {
      const result = isSuccessResponse({
        code: '09978',
        message: 'random',
        other: '',
      })

      expect(result).toBe(false)
    })

    it('should return true if code is 0 and message is Ok', () => {
      const result = isSuccessResponse({
        code: '0',
        message: 'Ok',
      })

      expect(result).toBe(true)
    })
  })
})
