import InsuranceService, { FindDocumentsParams } from '@app/services/insurance'
import { isSuccessResponse } from '@app/utils/guards'
import { callModal, downloadFile } from '@app/utils/messages'
import useIdentity from '../use-identity'

import useAppSelector from '@app/hooks/use-app-selector'

import {
  selectorKey,
  selectorTransactionReference,
} from '@app/store/selectors/selectors'

/**
 * @param document return static file by document 'alias', if not provided, get preview of certificate
 */
const useDownloadFile = (document?: string) => {
  const flowCode = 'FL_LIF_HEAL' // useAppSelector(selectorTransactionReference)

  return async () => {
    try {
      callModal(callModal.OPEN)

      if (!flowCode) return

      const findDocumentsParams: FindDocumentsParams = {
        documents: [{ flowCode, reference: document ?? '' }],
      }

      const result = await InsuranceService.findDocuments(findDocumentsParams)

      if (!isSuccessResponse(result)) return

      const [firstDocument] = result.value.documents

      downloadFile(firstDocument)
    } finally {
      callModal(callModal.CLOSE)
    }
  }
}

export default useDownloadFile
