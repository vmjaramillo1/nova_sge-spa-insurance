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
        const formattedGuid = detail.guid.replace(
          /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
          '$1-$2-$3-$4-$5'
        )

        const formatDetail = {
          ...detail,
          guid: formattedGuid,
        }

        dispatch(authenticate(formatDetail))

        const identity: PersonSession = {
          device: formatDetail.device,
          guid: formatDetail.guid,
          ip: formatDetail.ip,
          session: formatDetail.session,
        }

        const stringifyIdentity = JSON.stringify(identity)

        axios.defaults.headers.common['X-Authentication'] = formatDetail.jwtToken
        axios.defaults.headers.common['Channel'] = formatDetail.channel ?? 'movil'
        axios.defaults.headers.common['X-Channel'] = formatDetail.channel ?? 'movil'
        axios.defaults.headers.common['Channel'] = formatDetail.channel ?? 'movil'
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
