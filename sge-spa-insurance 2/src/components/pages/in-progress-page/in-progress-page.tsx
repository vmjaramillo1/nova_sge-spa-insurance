import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event/use-page-tracking-event'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'

const InProgressPage = () => {
  useBackButton(backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.IN_PROGRESS_VIEW_PAGE)

  const handleBack = backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_CTA)

  return (
    <div className="cannot-offered-page">
      <Feedback
        title="Estamos procesando la contratación de tu seguro"
        type="info"
        classes={{ root: 'pt-40' }}
      >
        <Typography>
          En unos minutos podrás consultar los detalles de tu seguro y los canales de
          comunicación disponibles para su uso.
        </Typography>
      </Feedback>
      <Button className="cannot-offered-page__button mt-auto" onClick={handleBack}>
        Entendido
      </Button>
    </div>
  )
}

export default InProgressPage
