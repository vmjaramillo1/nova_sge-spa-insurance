import useBackButton from '@app/hooks/use-back-button'

import './not-business-rule-page.scss'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

function useAlreadyPage() {
  const handleBack = backHomeWithTracking(TrackingEvents.ALREADY_CLICK_CTA)

  useBackButton(backHomeWithTracking(TrackingEvents.ALREADY_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.ALREADY_VIEW_PAGE)

  return {
    handleBack,
  }
}

export default useAlreadyPage
