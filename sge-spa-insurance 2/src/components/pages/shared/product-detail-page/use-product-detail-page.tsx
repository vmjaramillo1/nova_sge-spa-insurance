import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import useBackButton from '@app/hooks/use-back-button'
import useIdentity from '@app/hooks/use-identity'

import { filterAndSort } from '@app/utils/common'
import { pushTrackEvent, TrackingEvents } from '@app/utils/messages'

import { APP_ROUTES, AllRouteAliases } from '@app/routes/config'

import useModal from '@app/hooks/use-modal/use-modal'
import { CoverageItem } from '@app/store/hooks/use-generic-portal-selector/use-portal-shared-selector.interface'

import useNextBackStep from '@app/hooks/use-next-back-step'
import WrapperIcons from '@app/components/atoms/wrapper_icons/WrapperIcons'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'

export function useContentProductDetailPage() {
  const { currentPortal } = useCurrentPortal()

  const mappedFaqs = useMemo(() => {
    if (!currentPortal.content.home.sectionFaq) return []
    const currentFaqs = currentPortal.content.home.sectionFaq.questions
    const sortedFaqs = filterAndSort(currentFaqs)

    return sortedFaqs.map(
      ({ key, question, answer, track, icon, isActive, order }) => ({
        key,
        isActive,
        order,
        question,
        answer,
        track,
        icon: <WrapperIcons icon={icon} />,
        classes: { icon: 'min-w-48' },
      })
    )
  }, [currentPortal.content.home.sectionFaq])

  const mappedCoverages = useMemo(() => {
    if (!currentPortal.content.home.sectionCoverages) return []

    const currentCoverages =
      currentPortal.content.home.modalCoverages.coverages.items
    const mappedItems = mappedCoverageExclusions(currentCoverages)

    return mappedItems
  }, [currentPortal.content.home.sectionCoverages])

  const mappedExclusions = useMemo(() => {
    if (!currentPortal.content.home.sectionCoverages) return []

    const currentExclusions =
      currentPortal.content.home.modalCoverages.exclusions.items
    const mappedItems = mappedCoverageExclusions(currentExclusions)

    return mappedItems
  }, [currentPortal.content.home.sectionCoverages])

  return {
    content: currentPortal.content.home,
    questions: mappedFaqs,
    coverages: {
      ...currentPortal.content.home.modalCoverages,
      exclusions: {
        title: currentPortal.content.home.modalCoverages.exclusions.title,
        items: mappedExclusions,
      },
      coverages: {
        title: currentPortal.content.home.modalCoverages.coverages.title,
        items: mappedCoverages,
      },
    },
  }
}

const useProductDetailPage = () => {
  const navigate = useNavigate()
  const flowSteps = useNextBackStep()
  const identity = useIdentity()
  const { isOpen: showModalCoverage, toggle: handleModalCoverage } = useModal()

  // todo revisar traking
  useBackButton(() => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES[flowSteps.backStep as AllRouteAliases])
  })

  const handleContinue = async () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_CTA)
    if (!identity) return
    navigate(APP_ROUTES[flowSteps.nextStep as AllRouteAliases])
  }

  return {
    handleContinue,
    showModalCoverage,
    handleModalCoverage,
  }
}

const mappedCoverageExclusions = (coveragesList: Array<CoverageItem>) => {
  const sortedCoverages = filterAndSort(coveragesList)

  return sortedCoverages.map(({ key, description, isActive, order, icon }) => ({
    key,
    isActive,
    order,
    description,
    icon: (
      <pichincha-icon
        size="24px"
        type="--outlined"
        color={icon.color}
        weight-color="500"
        aria-hidden="true"
      >
        {icon.value}
      </pichincha-icon>
    ),
  }))
}

export default useProductDetailPage
