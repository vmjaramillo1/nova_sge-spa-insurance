import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event/use-page-tracking-event'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'
import './not-client-page.scss'

const NotClientPage = () => {
  useBackButton(backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_BUTTON_BACK))

  // todo ajustar
  usePageTrackingEvent(TrackingEvents.IN_PROGRESS_VIEW_PAGE)

  const handleBack = backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_CTA)

  return (
    <div className="not-client-page">
      <Feedback
        title="No pudimos recuperar tu información"
        type="info"
        classes={{ root: 'pt-40' }}
      >
        <Typography>
          Hubo un inconveniente al obtener tus datos. Intenta nuevamente en unos
          minutos
        </Typography>
      </Feedback>
      <Button className="mt-auto" onClick={handleBack}>
        Entendido
      </Button>
    </div>
  )
}

export default NotClientPage
