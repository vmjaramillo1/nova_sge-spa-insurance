import { useGlobal } from '@app/context/global-context'
import { useMemo } from 'react'

const useOsType = () => {
  const { authEvent } = useGlobal()

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
