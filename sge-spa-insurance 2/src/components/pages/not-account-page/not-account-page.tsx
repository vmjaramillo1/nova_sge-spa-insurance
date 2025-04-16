import { memo } from 'react'

import Button from '@app/components/atoms/button'
import Feedback from '@app/components/organisms/feedback'
import Typography from '@app/components/atoms/typography'

import useBackButton from '@app/hooks/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import {
  TrackingEvents,
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'
import { OPEN_ACCOUNTS_FLOW_URL } from '@app/utils/constants'

import './not-account-page.scss'

const NotAccountPage = () => {
  const handleBack = backHomeWithTracking(
    TrackingEvents.NOT_ACCOUNT_CLICK_BUTTON_CANCEL
  )

  useBackButton(backHomeWithTracking(TrackingEvents.NOT_ACCOUNT_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.NOT_ACCOUNT_VIEW_PAGE)

  const handleOpenAccount = () => {
    pushTrackEvent(TrackingEvents.NOT_ACCOUNT_CLICK_CTA)
    openBrowser(OPEN_ACCOUNTS_FLOW_URL)
  }

  return (
    <div className="not-account">
      <Feedback title="No tienes una cuenta" classes={{ root: 'pt-16' }}>
        <Typography>
          Necesitas una cuenta para registrar el débito y contratar este seguro. Sin
          embargo, no te preocupes, puedes solicitar una en 5 minutos.
        </Typography>
      </Feedback>
      <Button onClick={handleOpenAccount} className="mt-auto mb-16">
        Abrir una nueva cuenta
      </Button>
      <Button onClick={handleBack} color="secondary">
        Regresar al inicio
      </Button>
    </div>
  )
}

export default memo(NotAccountPage)
