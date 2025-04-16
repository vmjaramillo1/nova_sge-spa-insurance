import { HttpStatusCode } from '@app/utils/enums'
import ServiceError from './service-error'

describe('ServiceError', () => {
  it('should be initialized', () => {
    const error = new ServiceError(
      'Unexpected',
      HttpStatusCode.INTERNAL_SERVER_ERROR
    )

    expect(error._code).toBe('SERVICE_ERROR')
    expect(error._message).toBe('Unexpected')
  })
})
