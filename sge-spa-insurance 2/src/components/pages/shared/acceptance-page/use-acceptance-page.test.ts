import { renderHook } from '@testing-library/react'
import useAcceptancePage from './use-acceptance-page'
import { FlowStatus } from '@app/utils/enums'
import { TokenService } from '@pichincha/events-microsite'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@app/routes/config'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const axiosMock = new MockAdapter(axios)

jest.mock('@pichincha/events-microsite')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('useAcceptancePage', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.SoftTokenView).toBeDefined()
    expect(result.current.CountDownView).toBeDefined()
    expect(result.current.handleCancel).toBeInstanceOf(Function)
    expect(result.current.handleConfirm).toBeInstanceOf(Function)
    expect(result.current.disabled).toBe(true)
    expect(result.current.softToken).toEqual({
      value: '',
      ariaLabel: 'Hemos asegurado tu contratación tu código de seguridad es ',
    })
  })

  it('should be return softToken values', () => {
    jest
      .spyOn(TokenService, 'subscribeToTokenEvent')
      .mockImplementation((callback) => {
        callback({ detail: { softToken: '112343', timeLeft: '39' } })
      })

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.softToken).toEqual({
      value: '112343',
      ariaLabel:
        'Hemos asegurado tu contratación tu código de seguridad es 1 1 2 3 4 3',
    })
  })

  it('should return formatted content', () => {
    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.content.descriptions).toEqual({
      isActive: true,
      key: 'descriptions',
      order: 1,
      companyName: 'Novaecuador S.A.',
      policy: 'Póliza maestra nro.: 50157',
      toCompany: 'A la empresa:',
      from: 'De la cuenta: Corriente',
      productName: 'Seguro por robos y fraudes. Cobertura Total',
      forProduct: 'Por el producto:',
      aria: 'Vas a pagar 4 dólares con 9 centavos. De la cuenta: Corriente. A la empresa: Novaecuador S.A. Por el producto: Seguro por robos y fraudes. Cobertura total. Póliza maestra número: 5 0 1 5 7',
      toPay: 'Vas a pagar mensual: $ 4,09 inc. impuestos',
    })
  })

  it('should confirm acceptance and navigate success page', async () => {
    axiosMock.onPost().reply(200, {
      code: '0',
      message: 'Ok',
      value: 'ACCEPTED',
    })

    jest
      .spyOn(TokenService, 'subscribeToTokenEvent')
      .mockImplementation((callback) => {
        callback({ detail: { softToken: '112343', timeLeft: '39' } })
      })

    const navigate = jest.fn()
    useNavigateMock.mockImplementation(() => navigate)

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    await result.current.handleConfirm()

    expect(navigate).toBeCalledWith('/compra-exitosa', { replace: true })
  })

  it('should fail acceptance and navigate retry page', async () => {
    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          step: 'GENERAL_ERROR',
          status: FlowStatus.NORMAL,
        },
      },
      global: globalValues,
    })

    const wrapper = createWrapperStore(store)

    axiosMock.onPost().reply(500, {
      code: '1',
      message: 'ERROR _CODE',
      value: 'ERROR',
    })

    jest
      .spyOn(TokenService, 'subscribeToTokenEvent')
      .mockImplementation((callback) => {
        callback({ detail: { softToken: '112343', timeLeft: '39' } })
      })

    const navigate = jest.fn()
    useNavigateMock.mockImplementation(() => navigate)

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    await result.current.handleConfirm()

    expect(navigate).toBeCalledWith(APP_ROUTES.RETRY_ACCEPTANCE, { replace: true })
  })
})
