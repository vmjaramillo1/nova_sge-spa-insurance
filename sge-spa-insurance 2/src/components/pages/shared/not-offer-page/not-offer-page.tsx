import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event/use-page-tracking-event'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'
import './not-offer-page.scss'

const NotOfferPage = () => {
  useBackButton(backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_BUTTON_BACK))

  // todo ajustar
  usePageTrackingEvent(TrackingEvents.IN_PROGRESS_VIEW_PAGE)

  const handleBack = backHomeWithTracking(TrackingEvents.IN_PROGRESS_CLICK_CTA)

  return (
    <div className="not-offer-page">
      <Feedback
        title="Error al consultar tu oferta"
        type="error"
        classes={{ root: 'pt-40' }}
      >
        <Typography>
          No pudimos recuperar la información de tu oferta de seguros. Por favor,
          intenta ingresar nuevamente en unos minutos.
        </Typography>
      </Feedback>
      <Button className="mt-auto" onClick={handleBack}>
        Entendido
      </Button>
    </div>
  )
}

export default NotOfferPage
