import useApp from '@app/context/app-context/use-app'
import useFlow from '@app/context/flow-context/use-flow'

import useBackButton from '@app/hooks/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file'
import useIdentity from '@app/hooks/use-identity'

import { DefaultPortal } from '@app/utils/interfaces'
import { isSuccessResponse } from '@app/utils/guards'
import { filterAndSort, stringFormat } from '@app/utils/common'
import { monthByNumber, smartFormats } from '@app/utils/format/smart-format'
import InsuranceService from '@app/services/insurance'
import {
  TrackingEvents,
  backHomeWithTracking,
  callModal,
  downloadFile,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event/use-page-tracking-event'
import { useMemo } from 'react'
import {
  DOCUMENT_DOWNLOAD_STATIC_CODES,
  getAriaNumber,
  getMoneyAriaLabel,
} from '@app/utils'
import { PeriodicityCode } from '@app/utils/enums'

function usePreviousProductPage() {
  const {
    portal: { sale },
    sale: saleDetail,
    plans,
  } = useApp<DefaultPortal>()

  const { key, transactionReference } = useFlow()

  const identity = useIdentity()

  useBackButton(backHomeWithTracking(TrackingEvents.POSVENTA_CLICK_BUTTON_BACK))

  usePageTrackingEvent(TrackingEvents.POSVENTA_VIEW_PAGE)

  const downloadUseGuide = useDownloadFile(DOCUMENT_DOWNLOAD_STATIC_CODES.USE_GUIDE)
  const handleDownloadUseGuide = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_DOWNLOAD_BUTTON_USE_GUIDE)
    downloadUseGuide()
  }

  const handleOpenCall = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_CLICK_BUTTON_CALL)
    openBrowser(sale.actions.call.value)
  }

  const handleOpenWhatsapp = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_CLICK_BUTTON_WSP)
    openBrowser(sale.actions.whatsapp.value)
  }

  const handleDownloadContract = async () => {
    try {
      pushTrackEvent(TrackingEvents.POSVENTA_DOWNLOAD_BUTTON_CONTRACT)
      callModal(callModal.OPEN)

      if (!key || !transactionReference || !saleDetail?.idGpsSale || !identity)
        return

      const response = await InsuranceService.findContracts({
        key,
        transactionReference,
        reference: saleDetail.idGpsSale,
        identity: {
          cif: identity.cif,
          dni: identity.dni,
          dniType: identity.dniType,
        },
      })

      if (!isSuccessResponse(response)) return

      const [firstContract] = response.value

      downloadFile(firstContract)
    } finally {
      callModal(callModal.CLOSE)
    }
  }

  const currentPlan = useMemo(() => {
    const [firstPlan] = Object.keys(plans)
    return firstPlan
  }, [plans])

  const currentPeriodicity = useMemo(() => {
    const [firstPeriodicity] = Object.keys(plans[currentPlan].periodicityOptions)

    return firstPeriodicity
  }, [currentPlan, plans])

  const currentPrice = useMemo(() => {
    return plans[currentPlan].periodicityOptions[currentPeriodicity].totalPrice
  }, [currentPeriodicity, currentPlan, plans])

  const pichinchaIconProps = {
    size: '24px',
    color: 'blue',
    weight_color: '500',
    type: '--outlined',
  }

  const coverages = filterAndSort(sale.coverages.items)

  const saleFormatted = useMemo<typeof sale>(() => {
    const isAnnual = currentPeriodicity === PeriodicityCode.ANNUAL

    const startDate = smartFormats.toDate(saleDetail?.startVigency, 'full')
    const dateAria = smartFormats.toDate(saleDetail?.startVigency, 'aria')
    const currentSaleId = saleDetail?.idGpsSale ?? ''
    const ariaSaleId = getAriaNumber(currentSaleId)

    const debitDate = new Date(saleDetail?.startVigency ?? '')

    const debitDateDay = debitDate.getDate().toString()

    const period = isAnnual ? 'año' : 'mes'
    const dateLabel = `de cada ${period}`
    const month = monthByNumber[debitDate.getMonth()].full

    const debitDateLabel = isAnnual
      ? `${debitDateDay} ${month} ${dateLabel}`
      : `${debitDateDay} ${dateLabel}`

    const titlePeriodicity = `${smartFormats.toMoney(currentPrice)} cada ${period}`

    return {
      ...sale,
      description: {
        ...sale.description,
        aria: stringFormat(sale.description.aria, [
          ` ${getMoneyAriaLabel(currentPrice)} cada ${period}`,
        ]),
        value: stringFormat(sale.description.value, [titlePeriodicity]),
      },
      range: {
        ...sale.range,
        aria: stringFormat(sale.range.aria, [dateAria, debitDateLabel]),
        items: filterAndSort(
          sale.range.items.map((item) => ({
            ...item,
            value: stringFormat(item.value, [startDate, debitDateLabel]),
          }))
        ),
      },
      contract: {
        ...sale.contract,
        aria: stringFormat(sale.contract.aria, [ariaSaleId]),
        value: stringFormat(sale.contract.value, [currentSaleId]),
      },
    }
  }, [
    currentPeriodicity,
    currentPrice,
    sale,
    saleDetail?.idGpsSale,
    saleDetail?.startVigency,
  ])

  return {
    content: saleFormatted,
    coverages,
    pichinchaIconProps,
    handleDownloadContract,
    handleOpenWhatsapp,
    handleOpenCall,
    handleDownloadUseGuide,
  }
}

export default usePreviousProductPage
