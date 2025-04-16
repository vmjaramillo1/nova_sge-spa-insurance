import InvalidBodyError from './invalid-payload-error'

describe('InvalidBodyError', () => {
  it('should be initialized', () => {
    const error = new InvalidBodyError('Unexpected field "name"')

    expect(error._code).toBe('INVALID_BODY_ERROR')
    expect(error._message).toBe('Unexpected field "name"')
  })
})
