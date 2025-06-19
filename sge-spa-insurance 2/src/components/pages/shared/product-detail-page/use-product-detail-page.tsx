import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import useBackButton from '@app/hooks/use-back-button'
import useIdentity from '@app/hooks/use-identity'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import { filterAndSort } from '@app/utils/common'
import {
  backHomeWithTracking,
  pushTrackEvent,
  TrackingEvents,
} from '@app/utils/messages'

import { APP_ROUTES, AllRouteAliases } from '@app/routes/config'

import useAppSelector from '@app/hooks/use-app-selector'
import useModal from '@app/hooks/use-modal/use-modal'
import { CoverageItem } from '@app/store/hooks/use-generic-portal-selector/use-portal-shared-selector.interface'
import { selectorProductCode } from '@app/store/selectors/selectors'
import useGenericPortalByCodeSelector, {
  type PortalType,
} from '@app/store/hooks/use-generic-portal-selector'
import useNextStep from '@app/hooks/use-next-step'
import WrapperIcons from '@app/components/atoms/wrapper_icons/WrapperIcons'

export function useContentProductDetailPage() {
  const productCode = useAppSelector(selectorProductCode)

  const [, currentPortal] = useGenericPortalByCodeSelector(productCode as PortalType)

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
      currentPortal.content.home.sectionCoverages.coverages.items
    const mappedItems = mappedCoverageExclusions(currentCoverages)

    return mappedItems
  }, [currentPortal.content.home.sectionCoverages])

  const mappedExclusions = useMemo(() => {
    if (!currentPortal.content.home.sectionCoverages) return []

    const currentExclusions =
      currentPortal.content.home.sectionCoverages.exclusions.items
    const mappedItems = mappedCoverageExclusions(currentExclusions)

    return mappedItems
  }, [currentPortal.content.home.sectionCoverages])

  return {
    content: currentPortal.content.home,
    questions: mappedFaqs,
    coverages: {
      ...currentPortal.content.home.sectionCoverages,
      exclusions: {
        title: currentPortal.content.home.sectionCoverages.exclusions.title,
        items: mappedExclusions,
      },
      coverages: {
        title: currentPortal.content.home.sectionCoverages.coverages.title,
        items: mappedCoverages,
      },
    },
  }
}

const useProductDetailPage = () => {
  const navigate = useNavigate()
  const nextStep = useNextStep() as AllRouteAliases
  const identity = useIdentity()
  const { isOpen: showModalCoverage, toggle: handleModalCoverage } = useModal()

  // todo revisar traking
  useBackButton(() => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES.INSURANCE_PORTAL)
  })

  const handleContinue = async () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_CTA)
    if (!identity) return
    navigate(APP_ROUTES[nextStep])
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
