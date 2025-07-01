import InsuranceService, { FindDocumentsParams } from '@app/services/insurance'
import { isSuccessResponse } from '@app/utils/guards'
import { callModal, downloadFile } from '@app/utils/messages'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'

/**
 * @param document return static file by document 'alias', if not provided, get preview of certificate
 */
const useDownloadFile = (document?: string) => {
  const { currentPortal } = useCurrentPortal()

  if (!currentPortal) {
    console.warn('Missing fields: DownloadFileLin')
    callModal(callModal.CLOSE)
  }

  const flowCode = currentPortal.params.flowcode
  return async () => {
    try {
      // todo mejorar constantes
      callModal('OPEN')

      if (!flowCode) return

      const findDocumentsParams: FindDocumentsParams = {
        documents: [{ flowCode, reference: document ?? '' }],
      }

      const result = await InsuranceService.findDocuments(findDocumentsParams)

      if (!isSuccessResponse(result)) return

      const documents = result.value?.documents
      if (!Array.isArray(documents) || documents.length === 0) return

      const [firstDocument] = result.value?.documents

      downloadFile(firstDocument)
    } finally {
      callModal('CLOSE')
    }
  }
}

export default useDownloadFile
