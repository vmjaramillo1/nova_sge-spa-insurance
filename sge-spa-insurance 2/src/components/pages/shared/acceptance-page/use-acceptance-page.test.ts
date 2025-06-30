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
      from: 'De la cuenta: Ahorros',
      productName: 'Seguro por robos y fraudes. Cobertura Total',
      forProduct: 'Por el producto:',
      aria: 'Vas a pagar 4 dólares con 9 centavos. De la cuenta: Transaccional. A la empresa: Novaecuador S.A. Por el producto: Seguro por robos y fraudes. Cobertura total. Póliza maestra número: 5 0 1 5 7',
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
      app: {...appValues,
        paymentOptions: {
    accounts: {
      '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
        {
          hash: '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
          mask: '210021****',
          type: 'CTA.CTE PERSONAL',
          balance: '2000000.00',
          alias: 'ytytyty',
          favorite: false,
          allowsTransact: true,
          paymentType: 'CHECKING_ACCOUNT',
        },
      '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d':
        {
          hash: '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d',
          mask: '220404****',
          type: 'TRANSACCIONAL TRADICIONAL',
          balance: '2000000.00',
          alias: 'fdfdf',
          favorite: false,
          allowsTransact: true,
          paymentType: 'SAVINGS_ACCOUNT',
        },
      '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d':
        {
          hash: '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          mask: '221264****',
          type: 'Cuenta de AhorroTransaccional',
          balance: '20.00',
          alias: 'uyutty',
          favorite: true,
          allowsTransact: true,
          paymentType: 'SAVINGS_ACCOUNT',
        },
    },
    cards: {
      '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
        {
          hash: '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
          mask: '5555 5555 5555 4444',
          type: 'PERSONAL',
          balance: '2000000.00',
          alias: 'TARJETA',
          favorite: false,
          allowsTransact: true,
          paymentType: 'UNKNOWN',
        },
    },
  },
      },
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
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
