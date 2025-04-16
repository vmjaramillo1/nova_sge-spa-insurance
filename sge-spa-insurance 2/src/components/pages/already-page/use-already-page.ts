import useBackButton from '@app/hooks/use-back-button'

import './already-page.scss'
import {
  TrackingEvents,
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import { BP_CALL_NUMBER_LINK } from '@app/utils'
import useOsType from '@app/hooks/use-os-type/use-os-type'

function useAlreadyPage() {
  const { isAndroid } = useOsType()

  const handleBack = backHomeWithTracking(TrackingEvents.ALREADY_CLICK_CTA)

  useBackButton(backHomeWithTracking(TrackingEvents.ALREADY_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.ALREADY_VIEW_PAGE)

  const handleCall = () => {
    pushTrackEvent(TrackingEvents.ALREADY_CLICK_BUTTON_CALL)

    if (!isAndroid) return
    openBrowser(BP_CALL_NUMBER_LINK)
  }

  return {
    handleBack,
    handleCall,
  }
}

export default useAlreadyPage
