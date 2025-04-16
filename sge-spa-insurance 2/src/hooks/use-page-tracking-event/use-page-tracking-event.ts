import { useEffect } from 'react'

import { pushTrackEvent } from '@app/utils/messages'

const usePageTrackingEvent = (eventName: string) => {
  useEffect(() => pushTrackEvent(eventName), [eventName])
}

export default usePageTrackingEvent
