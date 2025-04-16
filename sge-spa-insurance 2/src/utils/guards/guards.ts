import { IdentityEvent } from '@pichincha/events-microsite'

import { Full, Response, ResponseWithResult } from '@app/utils/interfaces'
import { isValidValues } from '@app/utils/common'

export function isSuccessResponse<TResult>(
  response: Response<TResult>
): response is ResponseWithResult<TResult> {
  return response.code === '0' && response.message === 'Ok'
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
