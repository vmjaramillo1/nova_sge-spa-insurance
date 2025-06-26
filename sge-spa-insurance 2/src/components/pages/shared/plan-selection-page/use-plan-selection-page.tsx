import { useState } from 'react'
import { selectorProductCode } from '@app/store/selectors/selectors'
import { useNavigate } from 'react-router-dom'
import {
  useGenericProductByCodeSelector,
  type PortalTypeLife,
} from '@app/store/hooks/use-generic-portal-selector'
import useAppSelector from '@app/hooks/use-app-selector'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import {
  setPlanSelected,
  setPeriodicitySelected,
} from '@app/store/reducers/flow-slice'
import { sortByOrder } from '@app/utils'
import { APP_ROUTES, AllRouteAliases } from '@app/routes/config'
import useNextBackStep from '@app/hooks/use-next-back-step'
import useBackButton from '@app/hooks/use-back-button'
import { pushTrackEvent, TrackingEvents } from '@app/utils/messages'
import { useSmartText } from '@app/components/atoms/smart-text'

const usePlanSelectionPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const flowSteps = useNextBackStep()

  // todo revisar traking
  useBackButton(() => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES[flowSteps.backStep as AllRouteAliases])
  })

  const productCode = useAppSelector(selectorProductCode)
  const [, productData] = useGenericProductByCodeSelector(
    productCode as PortalTypeLife
  )

  const [selectedPlan, setSelectedPlan] = useState('LIFE_HEALTH_3')

  const content = productData?.portal?.content?.multiOffer
  const plans = productData?.plans
  const benefitsCodes = Object.keys(content.benefits).sort()
  const planCodes = Object.keys(plans)

  const ariaFooter = useSmartText(
    `${content.actions.cta.aria}
  ${content.actions.footer.planSelected.aria}
  ${content.actions.footer.planPrice.aria}
  ${content.actions.footer.paymentFrequency.aria}`,
    { selectedPlan }
  )

  const getIcon = (icon: string) => {
    const color = icon === 'close' ? 'error' : 'success'

    return (
      <pichincha-icon
        aria-hidden="true"
        size="20px"
        type="--outlined"
        color={color}
        weight-color="500"
      >
        {icon}
      </pichincha-icon>
    )
  }

  const handleNextPage = () => {
    const periodicityOptions = sortByOrder(
      Object.entries(plans[selectedPlan].periodicityOptions).map(
        ([code, periodicity]) => ({
          code,
          order: periodicity.order,
        })
      )
    )

    const [firstPeriodicity] = periodicityOptions
    dispatch(setPlanSelected(selectedPlan))
    dispatch(setPeriodicitySelected(firstPeriodicity.code))
    navigate(APP_ROUTES[flowSteps.nextStep as AllRouteAliases])
  }

  const handleChangePlan = (planCode: string) => {
    setSelectedPlan(planCode)
  }

  return {
    content,
    benefitsCodes,
    planCodes,
    getIcon,
    selectedPlan,
    handleChangePlan,
    handleNextPage,
    ariaFooter,
  }
}

export default usePlanSelectionPage
