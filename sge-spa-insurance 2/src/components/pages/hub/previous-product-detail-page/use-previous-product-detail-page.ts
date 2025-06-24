import useBackButton from '@app/hooks/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file'

import { isSuccessResponse } from '@app/utils/guards'
import { filterAndSort } from '@app/utils/common'
import InsuranceService from '@app/services/insurance'
import {
  TrackingEvents,
  callModal,
  downloadFile,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorPlanSelected,
  selectorContract,
} from '@app/store/selectors/selectors'
import { APP_ROUTES } from '@app/routes/config'
import { useNavigate } from 'react-router-dom'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'

function usePreviousProductDetailPage() {
  const navigate = useNavigate()

  const contract = useAppSelector(selectorContract)
  const { currentPortal } = useCurrentPortal()
  const { sale: saleContent } = currentPortal.content

  const planSelected = useAppSelector(selectorPlanSelected)

  useBackButton(() => {
    pushTrackEvent(TrackingEvents.PAYMENT_CLICK_BUTTON_BACK)
    navigate(APP_ROUTES.PREVIOUS_PRODUCT)
  })

  const downloadUseGuide = useDownloadFile(saleContent.actions.userGuide.value)
  const handleDownloadUseGuide = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_DOWNLOAD_BUTTON_USE_GUIDE)
    downloadUseGuide()
  }

  const handleOpenCall = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_CLICK_BUTTON_CALL)
    openBrowser(saleContent.contact.call.value)
  }

  const handleOpenWhatsapp = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_CLICK_BUTTON_WSP)
    openBrowser(saleContent.contact.whatsapp.value)
  }

  const handleOpenNetwork = () => {
    pushTrackEvent(TrackingEvents.POSVENTA_CLICK_BUTTON_WSP)
    openBrowser(saleContent.contact.cta.value)
  }

  const handleDownloadContract = async () => {
    try {
      pushTrackEvent(TrackingEvents.POSVENTA_DOWNLOAD_BUTTON_CONTRACT)
      callModal(callModal.OPEN)

      if (!contract) return

      const response = await InsuranceService.findContracts({
        reference: contract,
      })

      if (!isSuccessResponse(response)) return

      const [firstContract] = response.value

      downloadFile(firstContract)
    } finally {
      callModal(callModal.CLOSE)
    }
  }

  const pichinchaIconProps = {
    size: '22px',
    type: '--sharp',
    color: 'blue',
    'weight-color': '500',
  }

  const coverageItems = saleContent.coverages.MAP_PLANS[planSelected]

  const sortCoverageItems = filterAndSort(coverageItems)

  return {
    content: saleContent,
    planSelected,
    coverages: sortCoverageItems,
    pichinchaIconProps,
    handleDownloadContract,
    handleOpenWhatsapp,
    handleOpenCall,
    handleDownloadUseGuide,
    handleOpenNetwork,
  }
}

export default usePreviousProductDetailPage
