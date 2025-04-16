import { render, screen } from '@testing-library/react'
import PreviousProductPage from './previous-product-page'
import { createWrapper } from '@app/__test__/wrappers'
import { FlowState } from '@app/context/flow-context'
import { AppState } from '@app/context/app-context'
import { appValues, flowValues } from '@app/__test__/values'

const saleDetails = {
  idGpsSale: '567582',
  endVigency: '2021-07-05T00:00:00.000Z',
  startVigency: '2021-07-05T00:00:00.000Z',
  state: 'COMPLETADO',
}

const portalContent = {
  sale: {
    coverages: {
      description: {
        aria: 'Recuerda que puedes usar 2 veces cada caso hasta cubrir el máximo anual',
        value:
          'Recuerda que puedes usar 2 veces cada caso hasta cubrir el máximo anual',
      },
      headers: {
        label: 'Casos',
        value: 'Máximo anual',
      },
      items: [],
    },
    description: {
      aria: 'Plan Cobertura Total, por 3 dólares con 99 centavos cada mes',
      value: 'Plan cobertura total | $ 3,99 cada mes',
    },
    actions: {
      call: {
        aria: 'Llámanos 24 horas 7 días a la semana',
        isActive: true,
        value: 'tel:999999999',
      },
      whatsapp: {
        isActive: true,
        aria: '',
        value:
          'https://api.whatsapp.com/send?phone=9999999999&text=Hola%20Nova%2c%20busco%20ayuda%20con%20mi%20seguro%20de%20fraudes',
      },
      userGuide: {
        isActive: true,
        aria: '',
        value: 'guia-de-uso-frauds',
      },
    },
    range: {
      aria: '',
      items: [],
    },
    contract: {
      aria: 'Número de contrato: {0}',
      value: 'Nro. contrato: {0}',
    },
    insuranceCarrier: {
      label: 'Un producto de:',
      aria: 'Un producto de: AIG Metropolitana',
      value: 'AIG Metropolitana',
    },
    faq: {
      title: {
        value: 'Preguntas frecuentes',
        aria: 'Preguntas frecuentes, sección con tres opciones desplegables.',
      },
      questions: [],
    },
  },
}

const authValues = {
  channel: 'channel',
  cif: 'cif',
  clientId: 'clientId',
  clientIdType: 'clientIdType',
  deeplink: 'deeplink',
  device: 'device',
  guid: 'guid',
  ip: 'ip',
  os: 'ios',
  jwtToken: 'jwtToken',
  screenWidth: 'screenWidth',
  session: 'session',
  xsrf: 'xsrf',
}

const previousFlowValues: Partial<FlowState> = {
  ...flowValues,
  key: 'key',
  transactionReference: '65c63d39-967d-4e12-89c6-7d6eb414c416',
}

const previousAppValues: Partial<AppState<object>> = {
  ...appValues,
  portal: portalContent,
  sale: saleDetails,
}

describe('<PreviousProductPage />', () => {
  it('should render', () => {
    const wrapper = createWrapper({
      app: previousAppValues,
      flow: previousFlowValues,
      global: {
        authEvent: { ...authValues, os: 'unknown' },
      },
    })

    const { baseElement } = render(<PreviousProductPage />, { wrapper })

    expect(baseElement).toMatchSnapshot()
  })

  it('should not render call button if os is not android', () => {
    const wrapper = createWrapper({
      app: previousAppValues,
      flow: previousFlowValues,
      global: {
        authEvent: { ...authValues, os: 'ios' },
      },
    })

    const { baseElement } = render(<PreviousProductPage />, { wrapper })

    const callButton = screen.queryByLabelText(
      'Llámanos 24 horas 7 días a la semana'
    )

    expect(baseElement).toMatchSnapshot()
    expect(callButton).not.toBeInTheDocument()
  })

  it('should add call button in android devices', () => {
    const wrapper = createWrapper({
      app: previousAppValues,
      flow: previousFlowValues,
      global: {
        authEvent: { ...authValues, os: 'android' },
      },
    })

    render(<PreviousProductPage />, { wrapper })

    const callButton = screen.getByLabelText('Llámanos 24 horas 7 días a la semana')

    expect(callButton).toBeInTheDocument()
  })
})
