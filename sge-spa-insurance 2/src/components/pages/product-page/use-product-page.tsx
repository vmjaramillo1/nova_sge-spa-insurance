import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useApp from '@app/context/app-context/use-app'
import useBackButton from '@app/hooks/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file'
import useCurrentAccount from '@app/hooks/use-current-account'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'

import { APP_ROUTES } from '@app/routes/config'
import {
  formatMoney,
  getAriaAccountLabel,
  getAriaAccountMoney,
  getAriaAccountNumber,
  sortByOrder,
} from '@app/utils'
import { DefaultPortal } from '@app/utils/interfaces'
import { TrackingEvents, pushTrackEvent } from '@app/utils/messages'
import { useFlow } from '@app/context/flow-context'
import { PeriodicityCode } from '@app/utils/enums'

function roundNum(num: string | number) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100
}

interface PeriodicityExtraProps {
  total: number
  difference: number
  percentage: number
}

const useProductPage = () => {
  const [accepted, setAccepted] = useState<boolean>(false)

  const navigate = useNavigate()

  const currentAccountValues = useCurrentAccount()

  const {
    isMultiAccount,
    plans,
    portal: { productInfo },
  } = useApp<DefaultPortal>()

  const { planSelected, periodicitySelected, dispatchPeriodicitySelected } =
    useFlow()
  debugger;
  const periodicityOptions = plans[planSelected].periodicityOptions

  const iterablePeriodicityOptions = sortByOrder(
    Object.entries(periodicityOptions).map(([code, option]) => ({
      code,
      ...option,
    }))
  )

  const periodicityOptionsExtraProperties = useMemo(() => {
    const [firstOption] = iterablePeriodicityOptions
    const minimumPrice = Number(firstOption.totalPrice)

    return iterablePeriodicityOptions.reduce((options, option) => {
      const factor = Number(option.factor)
      const price = Number(option.totalPrice)

      const priceByFactor = minimumPrice * factor
      const difference = priceByFactor - price

      options[option.code] = {
        total: roundNum(priceByFactor),
        difference: roundNum(difference),
        percentage: roundNum((difference / price) * 100),
      }

      return options
    }, {} as Record<string, PeriodicityExtraProps>)
  }, [iterablePeriodicityOptions])

  const periodicityOptionsContent = useMemo(() => {
    return iterablePeriodicityOptions.map((option) => {
      const isAnnual = option.code === PeriodicityCode.ANNUAL

      return {
        code: option.code,
        name: option.name,
        price: formatMoney(option.totalPrice),
        badge: isAnnual ? 'OFERTA' : undefined,
        additional: isAnnual
          ? formatMoney(periodicityOptionsExtraProperties[option.code].total)
          : undefined,
      }
    })
  }, [iterablePeriodicityOptions, periodicityOptionsExtraProperties])

  const ariaLabelAccount = useMemo(() => {
    if (!currentAccountValues) return null

    const { amount, description, type, alias } = currentAccountValues

    const lastNumbers = getAriaAccountNumber(description)
    const ariaMoney = getAriaAccountMoney(amount)
    const ariaLabel = getAriaAccountLabel(type, alias)

    return `Desde cuenta ${ariaLabel}, con saldo disponible de ${ariaMoney}, Número de cuenta termina en ${lastNumbers}`
  }, [currentAccountValues])

  const currentAccount = useMemo(() => {
    return {
      label: currentAccountValues?.label ?? '',
      description: currentAccountValues?.description ?? '',
      value: formatMoney(currentAccountValues?.amount.toString() ?? ''),
      ariaLabelAccount: ariaLabelAccount ?? '',
    }
  }, [currentAccountValues, ariaLabelAccount])

  useBackButton(() => {
    pushTrackEvent(TrackingEvents.PAYMENT_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES.PRODUCT_DETAIL)
  })

  usePageTrackingEvent(TrackingEvents.PAYMENT_VIEW_PAGE)

  const handleClickAccount = () => {
    if (!isMultiAccount) return

    pushTrackEvent(TrackingEvents.PAYMENT_CLICK_BUTTON_ACCOUNT)
    navigate(APP_ROUTES.SELECT_ACCOUNT)
  }

  const handleClickContinue = () => {
    pushTrackEvent(TrackingEvents.PAYMENT_CLICK_CTA)
    navigate(APP_ROUTES.ACCEPTANCE)
  }

  const handleCheckLegal = () => {
    pushTrackEvent(TrackingEvents.PAYMENT_CHECK_TEXT)
    setAccepted((prev) => !prev)
  }

  const downloadDocumentsPreview = useDownloadFile()
  const handleDownload = () => {
    pushTrackEvent(TrackingEvents.PAYMENT_DOWNLOAD_LINK)
    downloadDocumentsPreview()
  }

  const handleClickPeriodicity = (code: string) => {
    dispatchPeriodicitySelected(code)
  }

  return {
    currentAccount,
    content: productInfo,
    periodicityOptionsContent,
    periodicitySelected,
    isMultiAccount,
    accepted,
    handleClickAccount,
    handleClickContinue,
    handleCheckLegal,
    handleDownload,
    handleClickPeriodicity,
  }
}

export default useProductPage
