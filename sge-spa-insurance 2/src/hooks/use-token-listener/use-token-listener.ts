import { useEffect, useState } from 'react'
import { TokenService } from '@pichincha/events-microsite'

type SendTokenEvent = {
  softToken: string
  timeLeft: number
}

export const initialTokenData: SendTokenEvent = {
  softToken: '',
  timeLeft: 0,
}

export const useTokenListener = () => {
  const [tokenData, setTokenData] = useState<SendTokenEvent>(initialTokenData)

  const onSendToken = (event: unknown) => {
    const { softToken, timeLeft } = (event as CustomEvent<SendTokenEvent>).detail
    setTokenData({ softToken, timeLeft })
  }

  useEffect(() => {
    TokenService.subscribeToTokenEvent(onSendToken)

    return () => {
      TokenService.unsubscribeToTokenEvent()
    }
  }, [])

  return tokenData
}

export default useTokenListener
