import { EncryptError, ResponseError } from '@app/utils/classes'
import { resolveError } from './service-utils'

describe('catchError', () => {
  it('should return unknown error when error is instance of Error', () => {
    const error = new Error('Error')

    const result = resolveError(error)

    expect(result.code).toBe('UNKNOWN')
    expect(result.message).toBe('Error')
  })

  it('should return response error when error is instance of ResponseError', () => {
    const error = new ResponseError({
      code: '023',
      message: 'Invalid Payload',
    })

    const result = resolveError(error)

    expect(result.code).toBe('023')
    expect(result.message).toBe('Invalid Payload')
  })

  it('should return encrypt error when error is instance of EncryptError', () => {
    const error = new EncryptError('Encrypt Error')

    const result = resolveError(error)

    expect(result.code).toBe('ENCRYPT_ERROR')
    expect(result.message).toBe('Encrypt Error')
  })

  it('should return execution error when error is not instance of Error', () => {
    const error = {
      code: 'Error',
      message: 'Error',
    }

    const result = resolveError(error)

    expect(result.code).toBe('EXECUTION')
    expect(result.message).toBe(JSON.stringify(error))
  })
})
