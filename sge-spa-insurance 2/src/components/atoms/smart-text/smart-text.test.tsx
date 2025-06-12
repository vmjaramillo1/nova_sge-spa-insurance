import { render, screen } from '@testing-library/react'
import SmartContent, { useSmartText } from '@app/components/atoms/smart-text'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import {  renderHook } from '@testing-library/react'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<SmartContent />', () => {
  it('should render normal content', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>, {
      wrapper: wrapper,
    })

    const textData = screen.getByText('Test de data')

    expect(textData).toBeInTheDocument()
  })

  it('should render h1 content', () => {
    const headH1 = '<h1>Test de data</h1>'
    const headH2 = '<h2>Test de data</h2>'
    const headH3 = '<h3>Test de data</h3>'
    const headH4 = '<h4>Test de data</h4>'
    const headH5 = '<h5>Test de data</h5>'
    const contentP = '<p>Test de data P</p>'

    render(
      <>
        <SmartContent>{headH1}</SmartContent>
        <SmartContent>{headH2}</SmartContent>
        <SmartContent>{headH3}</SmartContent>
        <SmartContent>{headH4}</SmartContent>
        <SmartContent>{headH5}</SmartContent>
        <SmartContent>{contentP}</SmartContent>
      </>,
      {
        wrapper: wrapper,
      }
    )

    const headingH1 = screen.getByRole('heading', { level: 1 })
    const headingH2 = screen.getByRole('heading', { level: 2 })
    const headingH3 = screen.getByRole('heading', { level: 3 })
    const headingH4 = screen.getByRole('heading', { level: 4 })
    const headingH5 = screen.getByRole('heading', { level: 5 })
    const contentRedendingP = screen.getByText('Test de data P')
    expect(headingH1).toBeInTheDocument()
    expect(headingH2).toBeInTheDocument()
    expect(headingH3).toBeInTheDocument()
    expect(headingH4).toBeInTheDocument()
    expect(headingH5).toBeInTheDocument()
    expect(contentRedendingP).toBeInTheDocument()
  })

  it('should render context data content', () => {
    const test = '{{flow.shared.productCode}}'

    render(<SmartContent>{test}</SmartContent>, {
      wrapper: wrapper,
    })

    screen.debug()

    const textElement = screen.getByText('TU_BAN_PRO')
    expect(textElement).toBeInTheDocument()
  })

  it('should render context format', () => {
    const money =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.price::money()}}</p>'
    const lower =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.description::lower()}}</p>'
    const upper =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.description::upper()}}</p>'
    const prependText =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.description::prependText(Mensual)}}</p>'
    const multiplyText =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.order::multiply(3)}}</p>'
    const bolderText =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.MONTHLY.description::bolder()}}</p>'
    const toMoneyText =
      '<p>{{app.products.LIFE_HEALTH.plans.LIFE_HEALTH_2.periodicityOptions.ANNUAL.taxes::toMoney()}}</p>'
    const toDateText =
      '<p>{{global.portalHub.content.home.sectionHero.title.aria::toDate()}}</p>'

    render(
      <>
        <SmartContent>{money}</SmartContent>
        <SmartContent>{lower}</SmartContent>
        <SmartContent>{upper}</SmartContent>
        <SmartContent>{prependText}</SmartContent>
        <SmartContent>{multiplyText}</SmartContent>
        <SmartContent>{bolderText}</SmartContent>
        <SmartContent>{toMoneyText}</SmartContent>
        <SmartContent>{toDateText}</SmartContent>
      </>,
      {
        wrapper: wrapper,
      }
    )

    const elementMoney = screen.getByText('$ 168,70')
    const elementLower = screen.getByText('pago anual')
    const elementUpper = screen.getByText('PAGO ANUAL')
    const elementPrependText = screen.getByText('MensualPago anual')
    const elementMultiply = screen.getByText('6')
    const elementBolder = screen.getByText('Pago mensual')
    const elementtoMoney = screen.getByText('$ 7,19')
    const elementtoDate = screen.getByText('2 jun. 2025')
    expect(elementMoney).toBeInTheDocument()
    expect(elementLower).toBeInTheDocument()
    expect(elementUpper).toBeInTheDocument()
    expect(elementPrependText).toBeInTheDocument()
    expect(elementMultiply).toBeInTheDocument()
    expect(elementBolder).toBeInTheDocument()
    expect(elementtoMoney).toBeInTheDocument()
    expect(elementtoDate).toBeInTheDocument()
  })
})

describe('<useSmartText />', () => {
  it('should render normal smart content', () => {
    const text = '{{flow.shared.productCode}}'

    const { result } = renderHook(() => useSmartText(text), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current).toBe('TU_BAN_PRO')
  })
})
