import EncryptError from './encrypt-error'

describe('EncryptError', () => {
  it('should be initialized', () => {
    const error = new EncryptError('Invalid encrypt')

    expect(error._code).toBe('ENCRYPT_ERROR')
    expect(error._message).toBe('Invalid encrypt')
    expect(error.message).toBe('Invalid encrypt')
  })
})
