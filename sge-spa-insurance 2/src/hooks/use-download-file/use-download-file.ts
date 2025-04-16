import useFlow from '@app/context/flow-context/use-flow'
import InsuranceService, { FindDocumentsParams } from '@app/services/insurance'
import { isSuccessResponse } from '@app/utils/guards'
import { callModal, downloadFile } from '@app/utils/messages'
import useIdentity from '../use-identity'

/**
 * @param document return static file by document 'alias', if not provided, get preview of certificate
 */
const useDownloadFile = (document?: string) => {
  const { key, transactionReference } = useFlow()
  const identity = useIdentity()

  return async () => {
    try {
      callModal(callModal.OPEN)

      if (!key || !transactionReference || !identity) return

      const findDocumentsParams: FindDocumentsParams = {
        key,
        transactionReference,
        identity: {
          cif: identity.cif,
          dni: identity.dni,
          dniType: identity.dniType,
        },
      }

      if (document) {
        findDocumentsParams.documentsReference = [document]
      }

      const result = await InsuranceService.findDocuments(findDocumentsParams)

      if (!isSuccessResponse(result)) return

      const [firstProduct] = result.value
      const [firstDocument] = firstProduct.documents

      downloadFile(firstDocument)
    } finally {
      callModal(callModal.CLOSE)
    }
  }
}

export default useDownloadFile
