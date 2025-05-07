import { FC } from 'react'

import Button from '@app/components/atoms/button/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback/feedback'
import useBackButton from '@app/hooks/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'
import useAppSelector from '@app/hooks/use-app-selector'

import { selectorError } from '@app/store/selectors/selectors'

import './error-page.scss'

const ErrorPage: FC = () => {
  const lastError = useAppSelector(selectorError)?.at(-1)

  const handleBack = backHomeWithTracking(TrackingEvents.GENERAL_ERROR_CLICK_CTA)

  useBackButton(backHomeWithTracking(TrackingEvents.GENERAL_ERROR_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.GENERAL_ERROR_VIEW_PAGE)

  return (
    <div className="error-page">
      <Feedback
        title={lastError?.title ?? ''}
        type="info"
        classes={{ root: 'error-page__feedback' }}
      >
        <Typography>{lastError?.message}</Typography>
      </Feedback>
      <Button className="error-page__button mt-auto" onClick={handleBack}>
        Entendido
      </Button>
    </div>
  )
}

export default ErrorPage
