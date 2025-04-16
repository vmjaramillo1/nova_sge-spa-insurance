export class EncryptError extends Error {
  _code: string
  _message: string

  constructor(message: string) {
    super(message)
    this._code = 'ENCRYPT_ERROR'
    this._message = message
  }
}

export default EncryptError
