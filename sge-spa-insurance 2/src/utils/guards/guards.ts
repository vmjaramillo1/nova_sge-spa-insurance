import { IdentityEvent } from '@pichincha/events-microsite'
import { HttpStatusCode } from '@app/utils/enums'

import { Full, Response, ResponseWithResult } from '@app/utils/interfaces'
import { isValidValues } from '@app/utils/common'

const serviceSuccess: Array<HttpStatusCode> = [
  HttpStatusCode.DEFAULT,
  HttpStatusCode.OK,
]

export function isSuccessResponse<TResult>(
  response: Response<TResult>
): response is ResponseWithResult<TResult> {
  return (
    serviceSuccess.includes(Number(response.code) as unknown as HttpStatusCode) &&
    response.message.toLowerCase() === 'ok'
  )
}

export function isValidIdentity(
  identity: IdentityEvent
): identity is Full<IdentityEvent> {
  return isValidValues(
    identity.clientId,
    identity.clientIdType,
    identity.device,
    identity.guid,
    identity.ip,
    identity.jwtToken,
    identity.session,
    identity.cif,
    identity.channel
  )
}
