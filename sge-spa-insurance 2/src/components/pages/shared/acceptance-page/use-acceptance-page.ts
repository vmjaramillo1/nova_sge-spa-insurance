import { useMemo } from 'react'
import { useLottie } from 'lottie-react'
import { useNavigate } from 'react-router-dom'

import useBackButton from '@app/hooks/use-back-button'
import useCurrentAccount from '@app/hooks/use-current-account'
import useAcceptance from '@app/hooks/use-acceptance'
import useTokenListener, { initialTokenData } from '@app/hooks/use-token-listener'

import { APP_ROUTES } from '@app/routes/config'

import { FlowStatus, PeriodicityCode } from '@app/utils/enums'
import {
  TrackingEvents,
  backHomeWithTracking,
  callModal,
  pushTrackEvent,
} from '@app/utils/messages'
import {
  ACCOUNT_FORMATS,
  calculateAcceptanceNextStatus,
  formatMoney,
  getMoneyAriaLabel,
  stringFormat,
} from '@app/utils'
import {
  SOFT_TOKEN_ANIMATION_FR,
  SOFT_TOKEN_SIZE,
  SOFT_TOKEN_TIME,
} from '@app/utils/constants'

import softTokenAnimation from '@app/assets/animations/AnimacionCandadoCheck.json'
import countDownAnimation from '@app/assets/animations/CountDown.json'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import useAppSelector from '@app/hooks/use-app-selector'
import { setFlowStatus } from '@app/store/reducers/flow-slice'
import {
  selectorStatus,
  selectorPlanSelected,
  selectorPeriodicitySelected,
} from '@app/store/selectors/selectors'
import useAppDispatch from '@app/hooks/use-app-dispatch'

import useCurrentProduct from '@app/hooks/use-current-product'

const periodicityLabel: Record<string, string> = {
  [PeriodicityCode.ANNUAL]: 'anual',
  [PeriodicityCode.MONTHLY]: 'mensual',
}

const useAcceptancePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useBackButton(() => {
    pushTrackEvent(TrackingEvents.ACCEPT_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES.PRODUCT)
  })

  usePageTrackingEvent(TrackingEvents.ACCEPT_VIEW_PAGE)

  const { currentProduct: productData } = useCurrentProduct()

  const plans = productData.plans

  const status = useAppSelector(selectorStatus)
  const planSelected = useAppSelector(selectorPlanSelected)
  const periodicitySelected = useAppSelector(selectorPeriodicitySelected)

  const { acceptance } = productData.portal.content

  const currentAccount = useCurrentAccount()

  const currentPrice =
    plans[planSelected].periodicityOptions[periodicitySelected].totalPrice

  const handleCancel = backHomeWithTracking(
    TrackingEvents.ACCEPT_CLICK_BUTTON_CANCEL
  )

  const { softToken, timeLeft } = useTokenListener()

  const { View: SoftTokenView } = useLottie({
    animationData: softTokenAnimation,
    loop: true,
  })

  const { View: CountDownView } = useLottie({
    animationData: {
      ...countDownAnimation,
      ip: (SOFT_TOKEN_TIME - timeLeft / 1000) * Number(SOFT_TOKEN_ANIMATION_FR),
      fr: Number(SOFT_TOKEN_ANIMATION_FR),
    },
    style: {
      width: SOFT_TOKEN_SIZE,
      height: SOFT_TOKEN_SIZE,
    },
    loop: true,
    autoplay: true,
  })

  const acceptanceCallback = useAcceptance()
  const handleConfirm = async () => {
    try {
      pushTrackEvent(TrackingEvents.ACCEPT_CLICK_CTA)
      callModal(callModal.OPEN)
      await acceptanceCallback(softToken)

      dispatch(setFlowStatus(FlowStatus.END_SUCCESS))

      navigate(APP_ROUTES.SUCCESS, {
        replace: true,
      })
    } catch (error) {
      const targetStatus = calculateAcceptanceNextStatus(status)

      navigate(APP_ROUTES.RETRY_ACCEPTANCE, {
        replace: true,
      })
      dispatch(setFlowStatus(targetStatus))
    } finally {
      callModal(callModal.CLOSE)
    }
  }

  console.log('AcceptancePage currentAccount', currentAccount)

  const currentAccountFormat = ACCOUNT_FORMATS[currentAccount!.paymentType]

  const softTokenAria = useMemo(() => {
    const splittedTokenAria = softToken.split('').join(' ')

    return `Hemos asegurado tu contratación tu código de seguridad es ${splittedTokenAria}`
  }, [softToken])

  const formatContent = useMemo<typeof acceptance>(() => {
    return {
      ...acceptance,
      descriptions: {
        ...acceptance.descriptions,
        toPay: stringFormat(acceptance.descriptions.toPay, [
          formatMoney(currentPrice),
          periodicityLabel[periodicitySelected] ?? '',
        ]),
        aria: stringFormat(acceptance.descriptions.aria, [
          currentAccountFormat.type,
          getMoneyAriaLabel(currentPrice),
        ]),
        from: stringFormat(acceptance.descriptions.from, [
          currentAccountFormat?.alias ?? '',
        ]),
      },
    }
  }, [
    acceptance,
    currentAccountFormat?.alias,
    currentAccountFormat.type,
    currentPrice,
    periodicitySelected,
  ])

  return {
    content: formatContent,
    SoftTokenView,
    CountDownView,
    softToken: {
      value: softToken,
      ariaLabel: softTokenAria,
    },
    disabled: softToken === initialTokenData.softToken,
    handleConfirm,
    handleCancel,
  }
}

export default useAcceptancePage
