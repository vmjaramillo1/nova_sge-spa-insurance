import { useMemo } from 'react'

import useDownloadFile from '@app/hooks/use-download-file'
import useCurrentAccount from '@app/hooks/use-current-account'

import smartFormats, { monthByNumber } from '@app/utils/format/smart-format'
import { DefaultPortal } from '@app/utils/interfaces'
import {
  DOCUMENT_DOWNLOAD_STATIC_CODES,
  filterAndSort,
  formatMoney,
  getAriaAccountNumber,
  stringFormat,
} from '@app/utils'
import {
  TrackingEvents,
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import { PeriodicityCode } from '@app/utils/enums'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorPortal,
  selectorPlans,
  selectorPlanSelected,
  selectorPeriodicitySelected,
} from '@app/store/selectors/selectors'

const useSuccessPage = () => {
  const { success } = useAppSelector(selectorPortal) as {
    success: DefaultPortal['success']
  }
  const plans = useAppSelector(selectorPlans)

  const planSelected = useAppSelector(selectorPlanSelected)
  const periodicitySelected = useAppSelector(selectorPeriodicitySelected)

  usePageTrackingEvent(TrackingEvents.SUCCESS_VIEW_PAGE)

  const handleBackHome = backHomeWithTracking(TrackingEvents.SUCCESS_CLICK_END)

  const currentPrice =
    plans[planSelected].periodicityOptions[periodicitySelected].totalPrice

  const currentAccount = useCurrentAccount()

  const formatValues = useMemo<
    [string, string, string, string, string, string]
  >(() => {
    if (!currentAccount) return ['', '', '', '', '', '']

    const isAnnual = periodicitySelected === PeriodicityCode.ANNUAL

    const now = new Date()
    const stringifyNow = now.toString()
    const toDayString = now.getDate().toString()

    const dateLabel = isAnnual ? 'de cada año' : 'de cada mes'
    const month = monthByNumber[now.getMonth()].short

    const dateFormat = smartFormats.toDate(stringifyNow, 'short')
    const dateAriaFormat = smartFormats.toDate(stringifyNow, 'aria')

    const contractDate = isAnnual
      ? `${toDayString} ${month} ${dateLabel}`
      : `${toDayString} ${dateLabel}`

    const accountLastNumbersAria = getAriaAccountNumber(currentAccount.description)

    // [accountMask, purchaseDay, purchaseDateFormat, purchaseDateAriaFormat, accountEnd, price]
    return [
      currentAccount.mask,
      contractDate,
      dateFormat,
      dateAriaFormat,
      accountLastNumbersAria,
      formatMoney(currentPrice),
    ]
  }, [currentAccount, currentPrice, periodicitySelected])

  const formatSuccess = useMemo<typeof success>(() => {
    const details = success.details.map((detail) => {
      const subItems = detail.subItems.map((subItem) => ({
        ...subItem,
        value: stringFormat(subItem.value, formatValues),
      }))

      return {
        ...detail,
        aria: stringFormat(detail.aria, formatValues),
        subItems: filterAndSort(subItems),
      }
    })

    return {
      ...success,
      details: filterAndSort(details),
    }
  }, [formatValues, success])

  const downloadUseGuide = useDownloadFile(DOCUMENT_DOWNLOAD_STATIC_CODES.USE_GUIDE)
  const handleDownloadUserGuide = () => {
    pushTrackEvent(TrackingEvents.SUCCESS_DOWNLOAD_USE_GUIDE)
    downloadUseGuide()
  }

  const handleClickCall = () => {
    pushTrackEvent(TrackingEvents.SUCCESS_CLICK_CALL)
    openBrowser(success.moreInformation.action.link)
  }

  return {
    content: formatSuccess,
    handleDownloadUserGuide,
    handleClickCall,
    handleBackHome,
  }
}

export default useSuccessPage
