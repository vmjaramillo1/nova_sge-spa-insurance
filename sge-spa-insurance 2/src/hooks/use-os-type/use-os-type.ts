import { useMemo } from 'react'
import useAppSelector from '@app/hooks/use-app-selector'

import { selectorAuthEvent } from '@app/store/selectors/selectors'

const useOsType = () => {
  const authEvent = useAppSelector(selectorAuthEvent)

  const type = useMemo(() => {
    if (!authEvent?.os || typeof authEvent.os !== 'string') return 'unknown'

    return authEvent.os.toLowerCase()
  }, [authEvent?.os])

  const isAndroid = useMemo(() => type === 'android', [type])
  const isIos = useMemo(() => type === 'ios', [type])
  const isUnknown = useMemo(() => type === 'unknown', [type])

  return {
    type,
    isUnknown,
    isAndroid,
    isIos,
  }
}

export default useOsType
