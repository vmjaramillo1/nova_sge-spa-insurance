import ActionButton from '@app/components/atoms/action-button/action-button'
import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography/'
import WhatsappIcon from '@app/components/icons/WhatsappIcon'
import Feedback from '@app/components/organisms/feedback'
import useBackButton from '@app/hooks/use-back-button/use-back-button'
import useDownloadFile from '@app/hooks/use-download-file/use-download-file'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import {
  BP_CALL_NUMBER_LINK,
  DOCUMENT_DOWNLOAD_STATIC_CODES,
  WHATSAPP_LINK,
} from '@app/utils'
import { useNavigate } from 'react-router-dom'

import {
  TrackingEvents,
  backHomeWithTracking,
  openBrowser,
  pushTrackEvent,
} from '@app/utils/messages'
import SmartContent from '@app/components/atoms/smart-text'

import './previous-product-page.scss'
import useOsType from '@app/hooks/use-os-type/use-os-type'
import { act } from 'react'
import { APP_ROUTES, AllRouteAliases } from '@app/routes/config'
import useAppDispatch from '@app/hooks/use-app-dispatch'

import BackHomeCard from '@app/components/pages/hub/previous-product-page/back-home-card'
import PreviousProductCard, {
  StatusType,
} from '@app/components/atoms/previous-product-card/previous-product-card'
import {
  setProductCodeSelected,
  setPlanSelected,
  setPeriodicitySelected,
} from '@app/store/reducers/flow-slice'

const data = {
  description: {
    value:
      'Revisa tus seguros vigentes, conoce qué cubre cada uno y accede a tus documentos en cualquier momento.',
    aria: 'Revisa tus seguros vigentes, conoce qué cubre cada uno y accede a tus documentos en cualquier momento.',
  },
  defaultCard: {
    description: {
      value: 'Descubre más seguros pensados para ti.',
      aria: 'Descubre más seguros pensados para ti.',
    },
    action: {
      value: 'Ver seguros',
      aria: 'Ver seguros',
    },
  },
  products: {
    LIFE_HEALTH: {
      code: 'LIFE_HEALTH',
      title: {
        value: 'Seguro de Vida + Salud',
        aria: 'Seguro de Vida + Salud',
      },
      status: 'success',
      account: {
        value: 'Cuenta de debito: Nro. ******7154',
        aria: 'Cuenta de debito: Nro. ******7154',
      },
      nextPayment: {
        value: '02/12/2024',
        text: 'Próximo pago: ',
        aria: 'Próximo pago: ',
      },
      amount: {
        value: '$ 9,09',
        text: 'Monto a pagar: ',
        aria: 'Monto a pagar: ',
      },
      action: {
        value: 'Ver detalles de tu cobertura',
        aria: 'Ver detalles de tu cobertura',
      },
    },
    TU_BAN_PRO: {
      code: 'TU_BAN_PRO',
      title: {
        value: 'Robos y Fraudes',
        aria: 'Robos y Fraudes',
      },
      status: 'error',
      account: {
        value: 'Tarjeta de crédito: Nro. 2204********1171',
        aria: 'Tarjeta de crédito: Nro. 2204********1171',
      },
      nextPayment: {
        value: '02/12/2024',
        aria: 'Próximo pago: ',
        text: 'Próximo pago: ',
      },
      amount: {
        value: '$ 4,04',
        aria: 'Monto a pagar: ',
        text: 'Monto a pagar: ',
      },
      action: {
        value: 'Ver detalles de tu cobertura',
        aria: 'Ver detalles de tu cobertura',
      },
    },
    TU_BAN_PRO1: {
      code: 'TU_BAN_PRO',
      title: {
        value: 'Robos y Fraudes',
        aria: 'Robos y Fraudes',
      },
      status: 'warning',
      account: {
        value: 'Tarjeta de crédito: Nro. 2204********1171',
        aria: 'Tarjeta de crédito: Nro. 2204********1171',
      },
      nextPayment: {
        value: '02/12/2024',
        aria: 'Próximo pago: ',
        text: 'Próximo pago: ',
      },
      amount: {
        value: '$ 4,04',
        aria: 'Monto a pagar: ',
        text: 'Monto a pagar: ',
      },
      action: {
        value: 'Ver detalles de tu cobertura',
        aria: 'Ver detalles de tu cobertura',
      },
    },
  },
}

const PreviousProductPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // TODo valdiar evento
  useBackButton(backHomeWithTracking(TrackingEvents.PREVIOUS_CLICK_BUTTON_BACK))
  usePageTrackingEvent(TrackingEvents.PREVIOUS_VIEW_PAGE)

  const { description } = data

  const handleNavigateProduct = (productCode: string) => {
    console.log(productCode)

    dispatch(setProductCodeSelected(productCode))
    navigate(APP_ROUTES.PREVIOUS_PRODUCT_DETAIL)
  }

  return (
    <div className="previous-product-page">
      <Typography
        variant="body"
        className="previous-product-page__title"
        aria-label={description.aria}
      >
        <SmartContent>{description.value}</SmartContent>
      </Typography>

      <div className="previous-product-page__content -mx-24 mt-8 p-24">
        <PreviousProductCard
          {...{
            ...data.products.LIFE_HEALTH,
            status: data.products.LIFE_HEALTH.status as StatusType,
          }}
          handleClick={() => handleNavigateProduct(data.products.LIFE_HEALTH.code)}
        />

        <PreviousProductCard
          {...{
            ...data.products.TU_BAN_PRO,
            status: data.products.TU_BAN_PRO.status as StatusType,
          }}
          handleClick={() => handleNavigateProduct(data.products.TU_BAN_PRO.code)}
        />
        <PreviousProductCard
          {...{
            ...data.products.TU_BAN_PRO1,
            status: data.products.TU_BAN_PRO1.status as StatusType,
          }}
          handleClick={() => handleNavigateProduct(data.products.TU_BAN_PRO.code)}
        />

        <BackHomeCard {...data.defaultCard} />
      </div>
    </div>
  )
}

export default PreviousProductPage
