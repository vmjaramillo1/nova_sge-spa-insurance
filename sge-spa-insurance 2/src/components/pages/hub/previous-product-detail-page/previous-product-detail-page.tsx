import clsx from 'clsx'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider'
import Typography from '@app/components/atoms/typography'
import InsuranceIconTuBanPro from '@app/components/icons/InsuranceIconTuBanPro'
import WhatsappIcon from '@app/components/icons/WhatsappIcon'
import Button from '@app/components/atoms/button/button'
import DownloadIcon from '@app/components/icons/DownloadIcon'
import Badge from '@app/components/atoms/badge'
import SmartContent from '@app/components/atoms/smart-text'

import { isLastItemInArray } from '@app/utils/common'
import ActionButton from '@app/components/atoms/action-button'
import usePreviousProductDetailPage from './use-previous-product-detail-page'
import './previous-product-detail-page.scss'
import useOsType from '@app/hooks/use-os-type/use-os-type'
import { MAP_INSURANCE_STATUS } from '@app/utils/constants'
import { StatusType } from '@app/components/atoms/previous-product-card/previous-product-card'
import { text } from 'stream/consumers'

import { title } from 'process'
import { Icon } from '@mui/material'
import { h } from '@ds/types/stencil-public-runtime'
import ContactButton from './contact-button'

const content = {
  title: 'Seguro de Vehículos',
  contract: {
    value: 'Nro. contrato:  1234567890',
    aria: 'Nro. contrato:  1234567890',
  },
  plan: {
    value: 'Plan Cobertura Total',
    aria: 'Plan Cobertura Total',
  },
  paymentDate: {
    value: '02/12/2024',
    aria: 'Próximo pago: ',
    text: 'Próximo pago: ',
  },
  amount: {
    value: '$ 9,09',
    aria: 'Monto a pagar: ',
    text: 'Monto a pagar: ',
  },
  status: 'success',
  productFrom: {
    value: 'AIG Metropolitana',
    text: 'Un producto de:',
    aria: 'Un producto de:',
  },
  coverages: {
    title: {
      value:
        'Recuerda que puedes utilizar cada caso hasta 2 veces, respetando el límite anual.',
      aria: 'Recuerda que puedes utilizar cada caso hasta 2 veces, respetando el límite anual.',
    },
    items: [
      {
        key: '1',
        text: 'Casos',
        value: 'Máximo anual',
        aria: '',
      },
      {
        key: '2',
        text: 'Cargos fraudulentos',
        value: '$ 10.000',
        aria: '',
      },
      {
        key: '3',
        text: 'Robos en cajeros o ventanillas',
        value: '$ 1.400',
        aria: '',
      },
      {
        key: '4',
        text: 'Compras con tus tarjetas',
        value: '$ 1.000',
        aria: '',
      },
      {
        key: '5',
        text: 'Robos de billetera o bolso',
        value: '$ 600',
        aria: '',
      },
      {
        key: '6',
        text: 'Primeros auxilios por robo en cajero',
        value: '$ 200',
        aria: '',
      },
    ],
  },
  actions: {
    userGuide: {
      isActive: true,
      aria: 'Llamanos',
      value: 'Revisa <br />tu certificado',
      icon: 'vertical_align_bottom',
    },
    reviewCertificate: {
      isActive: true,
      aria: 'Llamanos',
      value: 'Revisa <br />tu certificado',
      icon: 'content_copy',
    },
  },
  contact: {
    title: {
      value: 'Para requerimientos o más información ',
      aria: 'Para requerimientos o más información ',
    },
    whatsapp: {
      text: 'Escríbenos al WhatsApp',
      aria: 'Escribir',
      value: 'Escribir',
      icon: 'smartphone',
    },
    call: {
      value: 'Llamar',
      aria: 'Llamanos',
      text: 'Llámanos 24/7',
      icon: 'call',
    },
  },
}

const PreviousProductDetailPage = () => {
  // const {
  //   content,
  //   handleDownloadContract,
  //   handleDownloadUseGuide,
  //   handleOpenCall,
  //   handleOpenWhatsapp,
  //   coverages,
  //   pichinchaIconProps,
  // } = usePreviousProductDetailPage()

  const { isAndroid } = useOsType()

  const pichinchaIconProps = {
    size: '22px',
    type: '--sharp',
    color: 'blue',
    'weight-color': '500',
  }

  const handletest = () => {
    console.log('click')
  }

  return (
    <div className="previous-product-detail">
      <div className="previous-product-detail__card mb-24">
        <div className="text-center mb-2">
          <InsuranceIconTuBanPro />
          <div className="mt-4 mb-2 py-2">
            <Typography variant="body" className="font-medium" aria-hidden="true">
              {content.title}
            </Typography>
            <Typography variant="legal" aria-label={content.contract.aria}>
              {content.contract.value}
            </Typography>
          </div>
          <Typography
            variant="caption"
            className="py-8 font-semibold"
            aria-label={content.plan.aria}
          >
            {content.plan.value}
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
          <Badge type={content.status as StatusType}>
            {MAP_INSURANCE_STATUS[content.status as StatusType]}
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
              onClick={handletest}
              icon={
                <pichincha-icon {...pichinchaIconProps}>
                  {content.actions.reviewCertificate.icon}
                </pichincha-icon>
              }
              aria-label={content.actions.reviewCertificate.aria}
            >
              <SmartContent>{content.actions.reviewCertificate.value}</SmartContent>
            </ActionButton>
          )}

          {content?.actions?.userGuide?.isActive && (
            <ActionButton
              onClick={handletest}
              icon={
                <pichincha-icon {...pichinchaIconProps}>
                  {content.actions.userGuide.icon}
                </pichincha-icon>
              }
              aria-label={content.actions.userGuide.aria}
            >
              <SmartContent>{content.actions.userGuide.value}</SmartContent>
            </ActionButton>
          )}
        </div>

        <Divider className="h-16 mb-2" />

        <Typography
          variant="caption"
          className="mb-8"
          aria-label={content.coverages.title.aria}
        >
          {content.coverages.title.value}
        </Typography>

        {content.coverages.items.map((coverageItem, coverageIndex) => {
          const isLast = isLastItemInArray(content.coverages.items, coverageIndex)

          return (
            <CoverageRow
              key={coverageItem.key}
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

        {/* 
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
        </div> */}
      </div>

      <Typography
        variant="body"
        className="font-medium mb-16"
        aria-label={content.contact.title.aria}
      >
        <SmartContent>{content.contact.title.value}</SmartContent>
      </Typography>
      <div className="previous-product-detail__card">
        <ContactButton
          aria={content.contact.call.aria}
          text={content.contact.call.text}
          buttonText={content.contact.call.value}
          onClick={handletest}
          icon={content.contact.call.icon}
        />
        <Divider className="h-16 mb-2" />
        <ContactButton
          aria={content.contact.whatsapp.aria}
          text={content.contact.whatsapp.text}
          buttonText={content.contact.whatsapp.value}
          onClick={handletest}
          icon={content.contact.whatsapp.icon}
        />
      </div>

      {/* <Button
        className="mb-24 download-use-guide"
        onClick={handleDownloadUseGuide}
        icon={<DownloadIcon />}
      >
        Cómo usar tu seguro
      </Button> */}
    </div>
  )
}

export default PreviousProductDetailPage
