import { ReactNode, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'
import StackClose from '@app/components/atoms/stack-close'

import useTokenListener from '@app/hooks/use-token-listener'
import useAcceptance from '@app/hooks/use-acceptance'

import { FlowStatus } from '@app/utils/enums'
import { APP_ROUTES } from '@app/routes/config'
import { calculateAcceptanceNextStatus } from '@app/utils'
import {
  TrackingEvents,
  backHomeWithTracking,
  callModal,
  goBackHome,
  pushTrackEvent,
} from '@app/utils/messages'

import useAppSelector from '@app/hooks/use-app-selector'
import { selectorStatus } from '@app/store/selectors/selectors'
import { setFlowStatus } from '@app/store/reducers/flow-slice'
import useAppDispatch from '@app/hooks/use-app-dispatch'

interface AttemptContent {
  title: ReactNode
  description: ReactNode
  button: ReactNode
}

interface AttemptTrackingGroup {
  RETRY_ACCEPT_CLICK_BUTTON_BACK: string
  RETRY_ACCEPT_VIEW_PAGE: string
  RETRY_ACCEPT_CLICK_CTA: string
  TAG_MANAGER: {
    STEP: string
    AUX: string
  }
}

type AttemptsStatusType =
  | FlowStatus.RETRY_ACCEPTANCE_INITIAL
  | FlowStatus.RETRY_ACCEPTANCE_LAST
  | FlowStatus.RETRY_ACCEPTANCE_ERROR

const contentByAttemptStatus: Record<AttemptsStatusType, AttemptContent> = {
  [FlowStatus.RETRY_ACCEPTANCE_INITIAL]: {
    title: 'No podemos completar la solicitud',
    description: <Typography>Por favor inténtalo nuevamente.</Typography>,
    button: 'Intentar nuevamente',
  },
  [FlowStatus.RETRY_ACCEPTANCE_LAST]: {
    title: 'Inconvenientes al enviar el código de verificación',
    description: <Typography>Por favor intenta de nuevo.</Typography>,
    button: 'Intentar de nuevo',
  },
  [FlowStatus.RETRY_ACCEPTANCE_ERROR]: {
    title: 'Intermitencias en el servicio',
    description: (
      <Typography>
        Estamos trabajando para solucionarlo en el menor tiempo posible. Inténtalo
        más tarde.
      </Typography>
    ),
    button: 'Entendido',
  },
}

const trackingGroupByFlowStatus: Record<AttemptsStatusType, AttemptTrackingGroup> = {
  [FlowStatus.RETRY_ACCEPTANCE_INITIAL]: {
    RETRY_ACCEPT_CLICK_BUTTON_BACK: TrackingEvents.RETRY_ACCEPT1_CLICK_BUTTON_BACK,
    RETRY_ACCEPT_VIEW_PAGE: TrackingEvents.RETRY_ACCEPT1_VIEW_PAGE,
    RETRY_ACCEPT_CLICK_CTA: TrackingEvents.RETRY_ACCEPT1_CLICK_CTA,
    TAG_MANAGER: {
      STEP: '08RetryAccept1',
      AUX: 'Reintento1',
    },
  },
  [FlowStatus.RETRY_ACCEPTANCE_LAST]: {
    RETRY_ACCEPT_CLICK_BUTTON_BACK: TrackingEvents.RETRY_ACCEPT2_CLICK_BUTTON_BACK,
    RETRY_ACCEPT_VIEW_PAGE: TrackingEvents.RETRY_ACCEPT2_VIEW_PAGE,
    RETRY_ACCEPT_CLICK_CTA: TrackingEvents.RETRY_ACCEPT2_CLICK_CTA,
    TAG_MANAGER: {
      STEP: '09RetryAccept2',
      AUX: 'Reintento2',
    },
  },
  [FlowStatus.RETRY_ACCEPTANCE_ERROR]: {
    RETRY_ACCEPT_CLICK_BUTTON_BACK: TrackingEvents.RETRY_ACCEPT3_CLICK_BUTTON_BACK,
    RETRY_ACCEPT_VIEW_PAGE: TrackingEvents.RETRY_ACCEPT3_VIEW_PAGE,
    RETRY_ACCEPT_CLICK_CTA: TrackingEvents.RETRY_ACCEPT3_CLICK_CTA,
    TAG_MANAGER: {
      STEP: '10RetryAccept3',
      AUX: 'Reintento3',
    },
  },
}

const RetryAcceptancePage = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectorStatus)

  const navigate = useNavigate()

  const { softToken } = useTokenListener()

  const acceptanceService = useAcceptance()

  const trackingGroup = useMemo(
    () => getTrackingGroupByFlowStatus(status as AttemptsStatusType),
    [status]
  )

  const handleBackHome = backHomeWithTracking(
    trackingGroup.RETRY_ACCEPT_CLICK_BUTTON_BACK
  )

  useEffect(() => {
    pushTrackEvent(trackingGroup.RETRY_ACCEPT_VIEW_PAGE)
  }, [trackingGroup.RETRY_ACCEPT_VIEW_PAGE])

  const handleClick = async () => {
    pushTrackEvent(trackingGroup.RETRY_ACCEPT_CLICK_CTA)

    if (status === FlowStatus.RETRY_ACCEPTANCE_ERROR) {
      goBackHome()
      return
    }

    try {
      callModal(callModal.OPEN)

      await acceptanceService(softToken)

      navigate(APP_ROUTES.SUCCESS)
      dispatch(setFlowStatus(FlowStatus.END_SUCCESS))
    } catch (error) {
      const targetStatus = calculateAcceptanceNextStatus(status)
      dispatch(setFlowStatus(targetStatus))
    } finally {
      callModal(callModal.CLOSE)
    }
  }

  const content = contentByAttemptStatus[status as AttemptsStatusType]

  return (
    <div className="container">
      <StackClose onClose={handleBackHome} />
      <Feedback title={content.title} type="error" classes={{ root: 'mt-120' }}>
        {content.description}
      </Feedback>
      <Button onClick={handleClick}>{content.button}</Button>
    </div>
  )
}

export default RetryAcceptancePage

const getTrackingGroupByFlowStatus = (status: AttemptsStatusType) => {
  return (
    trackingGroupByFlowStatus[status] ??
    trackingGroupByFlowStatus[FlowStatus.RETRY_ACCEPTANCE_INITIAL]
  )
}
