import ResponseError from './response-error'

describe('ResponseError', () => {
  it('should be initialized', () => {
    const error = new ResponseError({ code: '0099', message: 'Invalid Auth' })

    expect(error._code).toBe('0099')
    expect(error._message).toBe('Invalid Auth')
  })
})
