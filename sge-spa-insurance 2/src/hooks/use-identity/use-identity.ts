import { useGlobal } from '@app/context/global-context'
import { IdentityValues } from '@app/services/insurance'

const useIdentity = (): IdentityValues | null => {
  const { authEvent } = useGlobal()

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
