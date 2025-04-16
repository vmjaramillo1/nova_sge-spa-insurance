import { useCallback, useEffect } from 'react'
import { AuthService, LocalEvents, IdentityEvent } from '@pichincha/events-microsite'
import useGlobal from '@app/context/global-context/use-global'
import { isValidIdentity } from '@app/utils/guards'
import axios from 'axios'
import { PersonSession } from '@app/services/insurance'

const emptyCallback = () => null

export const useSetData = () => {
  const { dispatchAuthenticate } = useGlobal()

  const identityEventCallback = useCallback(
    (detail: IdentityEvent) => {
      if (isValidIdentity(detail)) {
        dispatchAuthenticate(detail)

        const identity: PersonSession = {
          device: detail.device,
          guid: detail.guid,
          ip: detail.ip,
          session: detail.session,
        }

        const stringifyIdentity = JSON.stringify(identity)

        axios.defaults.headers.common['Authorization'] = detail.jwtToken
        axios.defaults.headers.common['Channel'] = detail.channel ?? 'movil'
        axios.defaults.headers.common['Identity'] = stringifyIdentity
      }
    },
    [dispatchAuthenticate]
  )

  const backEventCallback = () => {
    const { HEADER_PRESS_EVENT } = LocalEvents
    document.dispatchEvent(new CustomEvent(HEADER_PRESS_EVENT))
  }

  useEffect(() => {
    AuthService.suscribeToInitEvents(
      identityEventCallback,
      emptyCallback,
      backEventCallback
    )

    return () => {
      AuthService.removeInitEvents(
        identityEventCallback,
        emptyCallback,
        backEventCallback
      )
    }
  }, [identityEventCallback])
}

export default useSetData
