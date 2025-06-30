import { useNavigate } from 'react-router-dom'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import useIdentity from '@app/hooks/use-identity'
import useAppSelector from '@app/hooks/use-app-selector'
import { useMemo, useRef, useState } from 'react'
import { LopdpAction } from '@app/utils/enums'
import { isSuccessResponse } from '@app/utils/guards'

import {
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
  TrackingEvents,
} from '@app/utils/messages'
import InsuranceService from '@app/services/insurance'

import useBackButton from '@app/hooks/use-back-button'
import { APP_ROUTES } from '@app/routes/config'

import { selectorLopdp } from '@app/store/selectors/selectors'
import { setLopdp } from '@app/store/reducers/app-slice'
import usePortalHubSelector from '@app/store/hooks/use-portal-hub-selector'

function getNextLopdpAction(hasConsent: boolean | null): LopdpAction {
  return hasConsent === null
    ? LopdpAction.ACCEPT_ACTION_CODE
    : LopdpAction.UPDATE_ACCEPT_ACTION_CODE
}

const useTermsAndConditionPage = () => {
  const navigate = useNavigate()
  const identity = useIdentity()
  const dispatch = useAppDispatch()

  const [, content] = usePortalHubSelector(
    (portal) => portal.content.termsAndConditions
  )

  const checkboxRef = useRef<HTMLInputElement>(null)
  const lopdp = useAppSelector(selectorLopdp)

  const [acceptTC, setAcceptTC] = useState<boolean>(lopdp.acceptedTermsConditions)

  // todo validar traking
  useBackButton(backHomeWithTracking(TrackingEvents.ONBOARDING_CLICK_BUTTON_BACK))

  const canContinue = useMemo(() => {
    if (!lopdp.acceptedTermsConditions) return acceptTC

    return true
  }, [lopdp.acceptedTermsConditions, acceptTC])

  const handleAcceptTC = (value: boolean) => {
    pushTrackEvent(TrackingEvents.ONBOARDING_CHECK_TEXT)
    setAcceptTC(value)
  }

  const handleLopdp = () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_DOWNLOAD_LINK_LOPDP)
    openBrowser(lopdp.url)
  }

  const handleContinue = async () => {
    if (canContinue && !lopdp.acceptedTermsConditions && !acceptTC) {
      window.scrollTo({
        top: checkboxRef.current?.offsetTop,
        behavior: 'smooth',
      })

      return
    }

    pushTrackEvent(TrackingEvents.ONBOARDING_CLICK_CTA)

    const { acceptedTermsConditions, url } = lopdp

    if (!identity) return

    if (!acceptedTermsConditions) {
      if (!acceptTC) return

      const { cif, dni, dniType } = identity

      const action = getNextLopdpAction(true) // todo eliminar xq iva el acpet tyC

      const response = await InsuranceService.consentLopdp({
        acceptedTermsConditions: acceptTC,
        hasConsent: acceptTC,
        action,
        url,
        identity: { cif, dni, dniType },
      })

      if (!isSuccessResponse(response)) return

      dispatch(
        setLopdp({
          acceptedTermsConditions: acceptTC,
          url,
        })
      )
    }

    navigate(APP_ROUTES.INSURANCE_PORTAL, {
      replace: true,
    })
  }

  return {
    content,
    acceptTC,
    handleAcceptTC,
    checkboxRef,
    handleLopdp,
    canContinue,
    handleContinue,
  }
}

export default useTermsAndConditionPage
