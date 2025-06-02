import clsx from 'clsx'
import { domToReact } from 'html-react-parser'
import Typography from '@app/components/atoms/typography'
import React from 'react'
import { pushTrackEvent, TrackingEvents } from '@app/utils/messages'
import { createReplace } from '../utils'
import { smartFormatParseOptions } from '../converter'
import useAppSelector from '@app/hooks/use-app-selector'
import useIdentity from '@app/hooks/use-identity'
import {
  selectorKey,
  selectorTransactionReference,
} from '@app/store/selectors/selectors'
import { callModal, downloadFile } from '@app/utils/messages'

import { FindDocumentsParams } from '@app/services/insurance'
import { isSuccessResponse } from '@app/utils/guards'
import { IdentityValues } from '@app/services/insurance'
export default createReplace({
  name: 'sf-download-file',
  attributes: ['staticdocumentcode', 'arialabel', 'classname'],
  replace: (node) => {
    const { arialabel = '', staticdocumentcode = '', classname = '' } = node.attribs

    return (
      <DownloadFileLinkWrapper
        classname={classname}
        ariaLabel={arialabel}
        staticDocumentCode={staticdocumentcode}
      >
        {domToReact(node.children, smartFormatParseOptions)}
      </DownloadFileLinkWrapper>
    )
  },
})

const DownloadFileLinkWrapper = ({
  children,
  ariaLabel,
  staticDocumentCode,
  classname,
}: {
  children: React.ReactNode
  ariaLabel: string
  staticDocumentCode: string
  classname: string
}) => {

  const key = useAppSelector(selectorKey)
  const transactionReference = useAppSelector(selectorTransactionReference)
  const identity = useIdentity()

  if (!key || !transactionReference || !identity) return null

  const handleClick = () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_DOWNLOAD_LINK_USE_GUIDE)
    downloadStaticDocument({
      key,
      transactionReference: transactionReference,
      identity,
      document: staticDocumentCode,
    })
  }

  return (
    <DownloadFileLink
      downloadFile={handleClick}
      ariaLabel={ariaLabel}
      classname={classname}
    >
      {children}
    </DownloadFileLink>
  )
}

const DownloadFileLink = ({
  children,
  ariaLabel,
  classname,
  downloadFile,
}: {
  children: React.ReactNode
  ariaLabel: string
  classname: string
  downloadFile: () => void
}) => {
  return (
    <Typography
      variant="caption"
      className={clsx(
        'underline text-information-500 font-semibold cursor-pointer',
        classname
      )}
      onClick={downloadFile}
      as="a"
      aria-label={ariaLabel}
    >
      {children}
    </Typography>
  )
}

const downloadStaticDocument = async ({
  document,
  key,
  transactionReference,
  identity,
}: {
  document: string
  key: string
  transactionReference: string
  identity: IdentityValues
}) => {
  try {
    callModal(callModal.OPEN)

    const findDocumentsParams: FindDocumentsParams = {
      key,
      transactionReference,
      identity,
      documentsReference: [document],
    }

    const InsuranceService = (await import('@app/services/insurance')).default

    const result = await InsuranceService.findDocuments(findDocumentsParams)

    if (!isSuccessResponse(result)) return

    const [firstProduct] = result.value
    const [firstDocument] = firstProduct.documents

    downloadFile(firstDocument)
  } finally {
    callModal(callModal.CLOSE)
  }
}
