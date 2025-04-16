import { useEffect } from 'react'
import { WebviewEvents } from '@pichincha/events-microsite'
import { LocalEvents } from '@app/utils/messages'

const { GO_BACK_SCREEN_EVENT } = WebviewEvents
const { HEADER_PRESS_EVENT } = LocalEvents

export const useBackButton = (onBackButtonPress: () => void) => {
  useEffect(() => {
    document.addEventListener(GO_BACK_SCREEN_EVENT, onBackButtonPress)
    document.addEventListener(HEADER_PRESS_EVENT, onBackButtonPress)
    return () => {
      document.removeEventListener(GO_BACK_SCREEN_EVENT, onBackButtonPress)
      document.removeEventListener(HEADER_PRESS_EVENT, onBackButtonPress)
    }
  }, [onBackButtonPress])
}

export default useBackButton
