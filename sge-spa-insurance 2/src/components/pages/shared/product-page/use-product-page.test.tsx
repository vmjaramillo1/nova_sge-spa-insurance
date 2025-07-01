import useProductPage from './use-product-page'
import { act, renderHook } from '@testing-library/react'
import { APP_ROUTES } from '@app/routes/config'

import { useNavigate } from 'react-router-dom'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

describe('useProductPage', () => {
  it('should return defaults values', () => {
    const store = makeStore({
      app: {
        ...appValues,
        paymentOptions: {
          accounts: {
            '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
              {
                hash: '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
                mask: '******2008',
                type: 'CTA.CTE PERSONAL',
                balance: '2000',
                alias: 'PRINCIPAL',
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
        ...flowValues,
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
          contentLoaded: true,
          step: 'PRODUCT',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    console.log('RESULTADO ', result)

    expect(result.current.isMultiAccount).toBe(true)
    expect(result.current.accepted).toBe(false)
    expect(result.current.currentAccount).toEqual({
      ariaLabelAccount:
        'Desde cuenta corriente principal, con saldo disponible de 2000 dólares, Número de cuenta termina en 2 0 0 8',
      description: '******2008',
      label: 'PRINCIPAL',
      value: '$ 2.000,00',
    })
    expect(result.current.handleClickContinue).toBeInstanceOf(Function)
    expect(result.current.handleCheckLegal).toBeInstanceOf(Function)
    expect(result.current.handleDownload).toBeInstanceOf(Function)
    expect(result.current.handleClickPeriodicity).toBeInstanceOf(Function)
  })

  it('should navigate to acceptance on handleClickContinue', () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleClickContinue()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.ACCEPTANCE)
  })

  it('should change accepted when handleCheckLegal is called', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleCheckLegal()
    })

    expect(result.current.accepted).toBe(true)
  })
})
