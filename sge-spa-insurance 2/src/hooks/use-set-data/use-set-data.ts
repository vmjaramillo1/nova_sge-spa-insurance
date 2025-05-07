import { useCallback, useEffect } from 'react'
import { AuthService, LocalEvents, IdentityEvent } from '@pichincha/events-microsite'
import { isValidIdentity } from '@app/utils/guards'
import axios from 'axios'
import { PersonSession } from '@app/services/insurance'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import { authenticate } from '@app/store/reducers/global-slice'

const emptyCallback = () => null

export const useSetData = () => {
  const dispatch = useAppDispatch()

  const identityEventCallback = useCallback(
    (detail: IdentityEvent) => {
      if (isValidIdentity(detail)) {
        dispatch(authenticate(detail))

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
    [dispatch]
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
