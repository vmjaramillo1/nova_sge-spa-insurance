import ActionButton from '@app/components/atoms/action-button/action-button'
import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography/'
import WhatsappIcon from '@app/components/icons/WhatsappIcon'
import Feedback from '@app/components/organisms/feedback'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file/use-download-file'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import {
  BP_CALL_NUMBER_LINK,
  DOCUMENT_DOWNLOAD_STATIC_CODES,
  WHATSAPP_LINK,
} from '@app/utils'
import {
  TrackingEvents,
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'

import './previous-page.scss'
import useOsType from '@app/hooks/use-os-type/use-os-type'

const PreviousPage = () => {
  const handleClick = backHomeWithTracking(TrackingEvents.PREVIOUS_CLICK_CTA)

  const { isAndroid } = useOsType()

  const pichinchaIconProps = {
    size: '24px',
    color: 'blue',
    weight_color: '500',
    type: '--outlined',
  }

  useBackButton(backHomeWithTracking(TrackingEvents.PREVIOUS_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.PREVIOUS_VIEW_PAGE)

  const downloadUseGuide = useDownloadFile(DOCUMENT_DOWNLOAD_STATIC_CODES.USE_GUIDE)
  const handleDownloadUseGuide = () => {
    pushTrackEvent(TrackingEvents.PREVIOUS_CLICK_BUTTON_USE_GUIDE)
    downloadUseGuide()
  }

  const handleOpenCall = () => {
    pushTrackEvent(TrackingEvents.PREVIOUS_CLICK_BUTTON_CALL)
    openBrowser(BP_CALL_NUMBER_LINK)
  }

  const handleOpenWhatsapp = () => {
    pushTrackEvent(TrackingEvents.PREVIOUS_CLICK_BUTTON_WSP)
    openBrowser(WHATSAPP_LINK)
  }

  return (
    <div className="previous-page">
      <Feedback
        title="¡Ya estás protegido!"
        classes={{ root: 'pt-40 px-24 mb-24 previous-page__feedback' }}
      >
        <Typography>
          Cuentas con el seguro por robos y fraudes, revisa cómo usar tu seguro o
          comunícate con nosotros a través de tu canal preferido.
        </Typography>
      </Feedback>
      <div className="previous-page__actions py-8">
        <ActionButton
          onClick={handleDownloadUseGuide}
          icon={<pichincha-icon {...pichinchaIconProps}>file_copy</pichincha-icon>}
          aria-label="Cómo usar tu seguro"
        >
          Cómo usar <br /> tu seguro
        </ActionButton>
        {isAndroid && (
          <ActionButton
            onClick={handleOpenCall}
            icon={<pichincha-icon {...pichinchaIconProps}>call</pichincha-icon>}
            aria-label="Llámanos 24 7"
          >
            Llámanos <br /> 24/7
          </ActionButton>
        )}
        <ActionButton
          onClick={handleOpenWhatsapp}
          icon={<WhatsappIcon />}
          aria-label="Escríbenos al WhatsApp"
        >
          Escríbenos <br /> al WhatsApp
        </ActionButton>
      </div>
      <Button onClick={handleClick} className="mt-auto">
        Entendido
      </Button>
    </div>
  )
}

export default PreviousPage
