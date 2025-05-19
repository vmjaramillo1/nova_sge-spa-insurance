import clsx from 'clsx'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider'
import Typography from '@app/components/atoms/typography'
import InsuranceIcon from '@app/components/icons/InsuranceIcon'
import WhatsappIcon from '@app/components/icons/WhatsappIcon'
import Button from '@app/components/atoms/button/button'
import Faq from '@app/components/organisms/faq'
import DownloadIcon from '@app/components/icons/DownloadIcon'

import { isLastItemInArray } from '@app/utils/common'
import ActionButton from '@app/components/atoms/action-button'
import usePreviousProductPage from './use-previous-product-page'
import './previous-product-page.scss'
import useOsType from '@app/hooks/use-os-type/use-os-type'

const PreviousProductPage = () => {
  const {
    content,
    handleDownloadContract,
    handleDownloadUseGuide,
    handleOpenCall,
    handleOpenWhatsapp,
    coverages,
    pichinchaIconProps,
  } = usePreviousProductPage()

  const { isAndroid } = useOsType()

  return (
    <div className="previous-product">
      <div className="previous-product__card mb-24">
        <div className="text-center mb-2">
          <InsuranceIcon />
          <div className="mt-4 mb-2 py-2">
            <Typography className="font-medium" aria-hidden="true">
              {content.title}
            </Typography>
            <Typography variant="legal" aria-label={content.contract.aria}>
              {content.contract.value}
            </Typography>
          </div>
          <Typography
            variant="caption"
            className="py-8 font-semibold"
            aria-label={content.description.aria}
          >
            {content.description.value}
          </Typography>
        </div>
        <Divider className="h-28 mb-2" />
        <CoverageRow
          label={content.insuranceCarrier.label}
          value={content.insuranceCarrier.value}
          aria={content.insuranceCarrier.aria}
          classes={{ root: 'mb-2', shared: 'text-caption' }}
        />
        <Divider className="h-28 mb-2" />
        <div aria-label={content.range.aria}>
          {content.range.items.map((range, index) => (
            <CoverageRow
              key={range.key}
              label={range.label}
              value={range.value}
              classes={{
                root: clsx(index === 0 && 'mb-2'),
                shared: 'text-caption',
              }}
            />
          ))}
        </div>
        <Divider className="h-16 mb-2" />
        <Typography
          variant="caption"
          className="font-medium mb-4"
          aria-label={content.coverages.description.aria}
        >
          {content.coverages.description.value}
        </Typography>
        <CoverageRow
          aria={`${content.coverages.headers.label}, ${content.coverages.headers.value}`}
          label={content.coverages.headers.label}
          value={content.coverages.headers.value}
          classes={{
            root: 'py-4',
            shared: 'text-caption',
          }}
          bolder
        />
        {coverages.map((coverageItem, coverageIndex) => {
          const isLast = isLastItemInArray(content.coverages.items, coverageIndex)

          return (
            <CoverageRow
              key={coverageItem.key}
              aria={coverageItem.aria}
              label={coverageItem.label}
              value={coverageItem.value}
              classes={{
                root: clsx(isLast ? 'mb-16' : 'mb-4'),
                shared: 'text-caption',
              }}
            />
          )
        })}
        <Divider className="h-16 mb-2" />
        <div className="previous-product__actions py-8">
          {content?.actions?.userGuide?.isActive && (
            <ActionButton
              onClick={handleDownloadContract}
              icon={
                <pichincha-icon {...pichinchaIconProps}>file_copy</pichincha-icon>
              }
              aria-label={content.actions.userGuide.aria}
            >
              Revisa <br />
              tu certificado
            </ActionButton>
          )}
          {content?.actions?.call?.isActive && isAndroid && (
            <ActionButton
              onClick={handleOpenCall}
              icon={<pichincha-icon {...pichinchaIconProps}>call</pichincha-icon>}
              aria-label={content.actions.call.aria}
            >
              Llámanos <br />
              24/7
            </ActionButton>
          )}
          {content?.actions?.whatsapp?.isActive && (
            <ActionButton
              onClick={handleOpenWhatsapp}
              icon={<WhatsappIcon />}
              aria-label={content.actions.whatsapp.aria}
            >
              Escríbenos <br />
              al WhatsApp
            </ActionButton>
          )}
        </div>
      </div>
      <Button
        className="mb-24 download-use-guide"
        onClick={handleDownloadUseGuide}
        icon={<DownloadIcon />}
      >
        Cómo usar tu seguro
      </Button>
      {/* <Faq
        title={content.faq.title.value}
        titleAria={content.faq.title.aria}
        items={content.faq.questions}
      /> */}
    </div>
  )
}

export default PreviousProductPage
