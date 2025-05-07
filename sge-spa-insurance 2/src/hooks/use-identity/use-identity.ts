import { IdentityValues } from '@app/services/insurance'

import useAppSelector from '@app/hooks/use-app-selector'

import { selectorAuthEvent } from '@app/store/selectors/selectors'

const useIdentity = (): IdentityValues | null => {
  const authEvent = useAppSelector(selectorAuthEvent)

  if (!authEvent) return null

  return {
    cif: authEvent.cif!,
    dni: authEvent.clientId,
    dniType: authEvent.clientIdType,

    device: authEvent.device,
    guid: authEvent.guid,
    session: authEvent.session,
    ip: authEvent.ip,
  }
}

export default useIdentity
