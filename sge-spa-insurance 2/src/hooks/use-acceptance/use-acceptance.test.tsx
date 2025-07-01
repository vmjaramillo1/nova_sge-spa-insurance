import useAcceptance from './use-acceptance'
import { act } from 'react-dom/test-utils'
import InsuranceService from '@app/services/insurance/insurance.service'
import { InvalidBodyError } from '@app/utils/classes'
import { renderHook } from '@testing-library/react'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

describe('useAcceptance', () => {
  const store = makeStore({
    app: appValues,
    flow: flowValues,
    global: globalValues,
  })

  it('should return function', () => {
    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toBeInstanceOf(Function)
  })

  it('should reject promise if has missing values', async () => {
    const store = makeStore({
      // missing values key, transactionReference, currentAccount
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected: '',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '',
          contentLoaded: true,
          step: 'PRODUCT',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapperStore(store),
    })

    await expect(() => result.current('3434654')).rejects.toThrow(InvalidBodyError)
  })

  it('should called InsuranceService.processTransaction', () => {
    const spyProcessTransaction = jest.spyOn(InsuranceService, 'processTransaction')

    const store = makeStore({
      app: {
        ...appValues,
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
        ...flowValues,
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
          contentLoaded: true,
          step: 'PRODUCT',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: {
        ...globalValues,
        security: {
          authEvent: {
            clientId: '1703603132',
            clientIdType: '0001',
            device: 'hvOi3g0+VYx0HWfSLHp+iVSbRGJVgV6eWs56ElRyctrx',
            guid: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
            session: '9b8cb2a8-757d-46a6-a891-ccee5a032090',
            ip: '0.0.0.0',
            jwtToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiZXhwIjoxNjkyMzMwNzE5LCJpYXQiOjE2OTIzMzAxMTksImp0aSI6IjYyZDc1ZGRiLTIyZDMtNGFmOS05NWEyLTE3NDAyZDlhNjJjYiJ9.17fqp3Dxc-lvJ--m_axZz2t-RBfEqVpIOvwRDkYCc5c',
            cif: '2383122',
            os: 'android',
            channel: 'movil',
          },
          isAuthenticated: true,
        },
      },
    })

    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current('3434654')
    })

    expect(spyProcessTransaction).toBeCalledWith({
      key: '',
      transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
      acceptanceReference: '3434654',
      accountType: 'Cuenta de AhorroTransaccional',
      accountValue: '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
      identity: {
        cif: '2383122',
        dni: '1703603132',
        dniType: '0001',
      },
      paymentMethodCode: 'BANK_ACCOUNT',
      paymentPeriodicityCode: 'MONTHLY',
      planCode: 'TU_BAN_PRO_2',
      productCode: 'TU_BAN_PRO',
    })
  })
})
