import clsx from 'clsx'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider'
import Typography from '@app/components/atoms/typography'
import InsuranceIconTuBanPro from '@app/components/icons/InsuranceIconTuBanPro'
import Button from '@app/components/atoms/button/button'
import Badge from '@app/components/atoms/badge'
import SmartContent from '@app/components/atoms/smart-text'

import { isLastItemInArray } from '@app/utils/common'
import ActionButton from '@app/components/atoms/action-button'
import usePreviousProductDetailPage from './use-previous-product-detail-page'
import './previous-product-detail-page.scss'
import { MAP_INSURANCE_STATUS } from '@app/utils/constants'
import { StatusType } from '@app/components/atoms/previous-product-card/previous-product-card'

import ContactButton from './contact-button'

const PreviousProductDetailPage = () => {
  const {
    content,
    planSelected,
    handleDownloadContract,
    handleDownloadUseGuide,
    handleOpenCall,
    handleOpenWhatsapp,
    handleOpenNetwork,
    coverages,
    pichinchaIconProps,
  } = usePreviousProductDetailPage()

  return (
    <div className="previous-product-detail">
      <div className="previous-product-detail__card mb-24">
        <div className="text-center mb-2">
          <InsuranceIconTuBanPro />
          <div className="mt-4 mb-2 py-2">
            <Typography variant="body" className="font-medium" aria-hidden="true">
              <SmartContent>{content.title.value}</SmartContent>
            </Typography>
            <Typography variant="legal" aria-label={content.contract.aria}>
              <SmartContent>{content.contract.value}</SmartContent>
            </Typography>
          </div>
          <Typography
            variant="caption"
            className="py-8 font-semibold"
            aria-label={content.plan.aria}
          >
            <SmartContent>{content.plan.value}</SmartContent>
          </Typography>
        </div>
        <Divider className="h-28 mb-2" />
        <div className="previous-product-detail__record">
          <div>
            <CoverageRow
              label={content.paymentDate.text}
              value={content.paymentDate.value}
              aria={content.paymentDate.aria}
              classes={{
                root: 'mb-2',
                shared: 'text-body',
                value: 'font-semibold',
              }}
            />
            <CoverageRow
              label={content.amount.text}
              value={content.amount.value}
              aria={content.amount.aria}
              classes={{
                root: 'mb-2',
                shared: 'text-body',
                value: 'font-semibold',
              }}
            />
          </div>
          <Badge type={'success' as StatusType}>
            {MAP_INSURANCE_STATUS['success' as StatusType]}
          </Badge>
        </div>

        <Divider className="h-28 mb-2" />

        <CoverageRow
          label={content.productFrom.text}
          value={content.productFrom.value}
          classes={{
            root: clsx('mb-2'),
            shared: 'text-caption',
          }}
        />
        <Divider className="h-16 mb-2" />

        <div className="previous-product-detail__actions py-8">
          {content?.actions?.reviewCertificate?.isActive && (
            <ActionButton
              onClick={handleDownloadContract}
              icon={
                <pichincha-icon {...pichinchaIconProps}>
                  {content.actions.reviewCertificate.icon}
                </pichincha-icon>
              }
              aria-label={content.actions.reviewCertificate.aria}
            >
              <SmartContent>{content.actions.reviewCertificate.text}</SmartContent>
            </ActionButton>
          )}

          {content?.actions?.userGuide?.isActive && (
            <ActionButton
              onClick={handleDownloadUseGuide}
              icon={
                <pichincha-icon {...pichinchaIconProps}>
                  {content.actions.userGuide.icon}
                </pichincha-icon>
              }
              aria-label={content.actions.userGuide.aria}
            >
              <SmartContent>{content.actions.userGuide.text}</SmartContent>
            </ActionButton>
          )}
        </div>

        <Divider className="h-16 mb-2" />

        {content.coverages?.title && (
          <Typography
            variant="caption"
            className="mb-8"
            aria-label={content.coverages.title.aria}
          >
            <SmartContent>{content.coverages.title.value}</SmartContent>
          </Typography>
        )}

        {coverages.map((coverageItem, coverageIndex) => {
          const isLast = isLastItemInArray(coverages, coverageIndex)

          return (
            <CoverageRow
              key={`${planSelected}-${coverageIndex}`}
              aria={coverageItem.aria}
              label={coverageItem.text}
              value={coverageItem.value}
              classes={{
                root: clsx(isLast ? 'mb-16' : 'mb-4'),
                shared: clsx(coverageIndex === 0 && 'font-semibold', 'text-caption'),
              }}
            />
          )
        })}
      </div>

      {content.contact?.cta && (
        <Button
          className="mt-auto"
          onClick={handleOpenNetwork}
          aria-label={content.contact?.cta.aria}
          color="secondary"
        >
          {content.contact?.cta.text}
        </Button>
      )}

      <Typography
        variant="body"
        className="font-medium my-16"
        aria-label={content.contact.title.aria}
      >
        <SmartContent>{content.contact.title.value}</SmartContent>
      </Typography>
      <div className="previous-product-detail__card">
        <ContactButton
          aria={content.contact.call.aria || ''}
          text={content.contact.call.text}
          buttonText={content.contact.call.act}
          onClick={handleOpenCall}
          icon={content.contact.call.icon}
        />
        <Divider className="h-16 mb-2" />
        <ContactButton
          aria={content.contact.whatsapp.aria || ''}
          text={content.contact.whatsapp.text}
          buttonText={content.contact.whatsapp.act}
          onClick={handleOpenWhatsapp}
          icon={content.contact.whatsapp.icon}
        />
      </div>
    </div>
  )
}

export default PreviousProductDetailPage
