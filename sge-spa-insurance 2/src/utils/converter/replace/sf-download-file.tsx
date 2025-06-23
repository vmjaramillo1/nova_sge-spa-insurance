import clsx from 'clsx'
import { domToReact } from 'html-react-parser'
import Typography, { TypographyProps } from '@app/components/atoms/typography'
import React from 'react'
import { pushTrackEvent, TrackingEvents } from '@app/utils/messages'
import { createReplace } from '../utils'
import { smartFormatParseOptions } from '../converter'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'
import { callModal, downloadFile } from '@app/utils/messages'

import { FindDocumentsParams } from '@app/services/insurance'
import { isSuccessResponse } from '@app/utils/guards'

export default createReplace({
  name: 'sf-download-file',
  attributes: ['staticdocumentcode', 'arialabel', 'classname', 'variant'],
  replace: (node) => {
    const {
      arialabel = '',
      staticdocumentcode = '',
      classname = '',
      variant = 'caption',
    } = node.attribs

    return (
      <DownloadFileLinkWrapper
        classname={classname}
        ariaLabel={arialabel}
        staticDocumentCode={staticdocumentcode}
        variant={variant}
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
  variant,
}: {
  children: React.ReactNode
  ariaLabel: string
  staticDocumentCode: string
  classname: string
  variant: string
}) => {
  const { currentPortal } = useCurrentPortal()

  if (!currentPortal || !staticDocumentCode) {
    console.warn('Missing fields: DownloadFileLin')
    return null
  }

  const flowCode = currentPortal.params.flowcode

  const handleClick = () => {
    pushTrackEvent(TrackingEvents.ONBOARDING_DOWNLOAD_LINK_USE_GUIDE)
    downloadStaticDocument({
      flowCode,
      documentCode: staticDocumentCode,
    })
  }

  return (
    <DownloadFileLink
      downloadFile={handleClick}
      ariaLabel={ariaLabel}
      classname={classname}
      variant={variant}
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
  variant,
}: {
  children: React.ReactNode
  ariaLabel: string
  classname: string
  variant: string
  downloadFile: () => void
}) => {
  return (
    <Typography
      variant={variant as TypographyProps['variant']}
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
  documentCode,
  flowCode,
}: {
  documentCode: string
  flowCode: string
}) => {
  try {
    callModal(callModal.OPEN)

    const findDocumentsParams: FindDocumentsParams = {
      documents: [{ flowCode, reference: documentCode }],
    }

    const InsuranceService = (await import('@app/services/insurance')).default

    const result = await InsuranceService.findDocuments(findDocumentsParams)

    if (!isSuccessResponse(result)) return

    const [firstDocument] = result.value.documents

    downloadFile(firstDocument)
  } finally {
    callModal(callModal.CLOSE)
  }
}
