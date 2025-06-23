import useAppSelector from '@app/hooks/use-app-selector'
import { selectorProductCode } from '@app/store/selectors/selectors'
import useGenericPortalByCodeSelector, {
  type PortalType,
} from '@app/store/hooks/use-generic-portal-selector'
import { useMemo } from 'react'
import { filterAndSort } from '@app/utils/common'
import { RoutesHubAlias } from '@app/utils/enums/routes-alias'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'

const useNextBackStep = () => {
  const { isPending, currentPortal } = useCurrentPortal()
  const currentStep = useAppSelector((state) => state.flow.shared.step)

  const currentSteps = useMemo(
    () => (isPending ? [] : filterAndSort(currentPortal.content.flow.steps)),
    [isPending, currentPortal]
  )

  return useMemo(() => {
    if (isPending)
      return {
        backStep: '',
        nextStep: '',
      }

    if (currentStep === '') {
      const [firstStep] = currentSteps
      return {
        backStep: RoutesHubAlias.INSURANCE_PORTAL,
        nextStep: firstStep.route,
      }
    }

    const currentIndex = currentSteps.findIndex((step) => step.route === currentStep)
    const nextIndex = currentIndex + 1
    const nextStep = currentSteps[nextIndex]
    const backStep =
      currentIndex <= 0
        ? { route: RoutesHubAlias.INSURANCE_PORTAL }
        : currentSteps[currentIndex - 1]

    return {
      backStep: backStep.route,
      nextStep: nextStep.route,
    }
  }, [currentStep, currentSteps, isPending])
}

export default useNextBackStep
