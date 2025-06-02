import useAppSelector from '@app/hooks/use-app-selector'
import { selectorProductCode } from '@app/store/selectors/selectors'
import useGenericPortalByCodeSelector, {
  type PortalType,
} from '@app/store/hooks/use-generic-portal-selector'
import { useMemo } from 'react'
import { filterAndSort } from '@app/utils/common'

const useNextStep = () => {
  const productCode = useAppSelector(selectorProductCode)
  const currentStep = useAppSelector((state) => state.flow.shared.step)

  const [isPending, currentPortal] = useGenericPortalByCodeSelector(
    productCode as PortalType
  )
  const currentSteps = useMemo(
    () => (isPending ? [] : filterAndSort(currentPortal.content.flow.steps)),
    [isPending, currentPortal]
  )

  return useMemo(() => {
    if (isPending) return ''

    if (currentStep === '') {
      const [firstStep] = currentSteps
      return firstStep.route
    }

    const currentIndex = currentSteps.findIndex((step) => step.route === currentStep)
    const nextIndex = currentIndex + 1
    const nextStep = currentSteps[nextIndex]

    return nextStep.route
  }, [currentStep, currentSteps, isPending])
}

export default useNextStep
