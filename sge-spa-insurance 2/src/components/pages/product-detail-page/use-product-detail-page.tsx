import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useApp from '@app/context/app-context/use-app'
import useBackButton from '@app/hooks/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file'
import useIdentity from '@app/hooks/use-identity'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import { isSuccessResponse } from '@app/utils/guards'
import { filterAndSort } from '@app/utils/common'
import { DefaultPortal } from '@app/utils/interfaces'
import { LopdpAction } from '@app/utils/enums'
import {
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
  TrackingEvents,
} from '@app/utils/messages'

import { APP_ROUTES } from '@app/routes/config'
import InsuranceService from '@app/services/insurance'
import { DOCUMENT_DOWNLOAD_STATIC_CODES } from '@app/utils'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'

function getNextLopdpAction(hasConsent: boolean | null): LopdpAction {
  return hasConsent === null
    ? LopdpAction.ACCEPT_ACTION_CODE
    : LopdpAction.UPDATE_ACCEPT_ACTION_CODE
}

export function useContentProductDetailPage() {
  const {
    portal: { productDetail },
  } = useApp<DefaultPortal>()

  const mappedCoverages = useMemo(() => {
    if (!productDetail?.coverages) return []

    const coverages = filterAndSort(productDetail.coverages)

    return coverages.map(({ key, title, subTitle, description, icon, aria }) => ({
      key,
      title,
      subTitle,
      description,
      aria,
      icon: (
        <pichincha-icon
          size="32px"
          type="--outlined"
          color="blue"
          weight-color="500"
        >
          {icon}
        </pichincha-icon>
      ),
      classes: { icon: 'min-w-48 text-center' },
    }))
  }, [productDetail?.coverages])

  return {
    content: productDetail,
    coverages: mappedCoverages,
  }
}

const useProductDetailPage = () => {
  const navigate = useNavigate()
  const identity = useIdentity()
  const checkboxRef = useRef<HTMLInputElement>(null)

  const { lopdp, dispatchLopdp } = useApp<DefaultPortal>()
  const { isIntersecting } = useIntersectionObserver({
    element: checkboxRef.current,
    options: { root: null, rootMargin: '0px 0px -128px 0px', threshold: 0 },
  })

  const [acceptTC, setAcceptTC] = useState<boolean>(lopdp.acceptedTermsConditions)

  const canContinue = useMemo(() => {
    if (!lopdp.acceptedTermsConditions && isIntersecting) return acceptTC

    return true
  }, [lopdp.acceptedTermsConditions, isIntersecting, acceptTC])

  useBackButton(backHomeWithTracking(TrackingEvents.ONBOARDING_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.ONBOARDING_VIEW_PAGE)

  const handleContinue = async () => {
    if (canContinue && !lopdp.acceptedTermsConditions && !acceptTC) {
      window.scrollTo({
        top: checkboxRef.current?.offsetTop,
        behavior: 'smooth',
      })

      return
    }

    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_CTA)

    const { acceptedTermsConditions, hasConsent, url } = lopdp

    if (!identity) return

    if (!acceptedTermsConditions) {
      if (!acceptTC) return

      const { cif, dni, dniType } = identity

      const action = getNextLopdpAction(hasConsent)

      const response = await InsuranceService.consentLopdp({
        acceptedTermsConditions: acceptTC,
        hasConsent: acceptTC,
        action,
        url,
        identity: { cif, dni, dniType },
      })

      if (!isSuccessResponse(response)) return

      dispatchLopdp({
        acceptedTermsConditions: acceptTC,
        hasConsent: acceptTC,
        url,
      })
    }

    navigate(APP_ROUTES.PRODUCT)
  }

  const handleAcceptTC = (value: boolean) => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CHECK_TEXT)
    setAcceptTC(value)
  }

  const downloadUseGuide = useDownloadFile(DOCUMENT_DOWNLOAD_STATIC_CODES.USE_GUIDE)
  const handleDownloadUseGuide = () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_DOWNLOAD_LINK_USE_GUIDE)
    downloadUseGuide()
  }

  const handleLopdp = () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_DOWNLOAD_LINK_LOPDP)
    openBrowser(lopdp.url)
  }

  return {
    lopdp,
    acceptTC,
    canContinue,
    handleAcceptTC,
    handleContinue,
    handleDownloadUseGuide,
    handleLopdp,
    checkboxRef,
  }
}

export default useProductDetailPage
