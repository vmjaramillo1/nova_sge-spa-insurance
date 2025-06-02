import useAcceptance from './use-acceptance'
import { act } from 'react-dom/test-utils'
import InsuranceService from '@app/services/insurance/insurance.service'
import { InvalidBodyError } from '@app/utils/classes'
import { renderHook } from '@testing-library/react'

import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@app/store/reducers/app-slice'
import globalSlice from '@app/store/reducers/global-slice'
import flowSlice from '@app/store/reducers/flow-slice'
import { Provider } from 'react-redux'

const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      app: appSlice.reducer,
      flow: flowSlice.reducer,
      global: globalSlice.reducer,
    },
    preloadedState,
  })

const createWrapper = (
  store: ReturnType<typeof makeStore>
): FC<PropsWithChildren> => {
  return ({ children }) => (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

describe('useAcceptance', () => {
  it('should return function', () => {
    const store = makeStore()

    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toBeInstanceOf(Function)
  })

  it('should reject promise if has missing values', async () => {
    const store = makeStore() // missing values key, transactionReference, currentAccount

    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapper(store),
    })

    await expect(() => result.current('3434654')).rejects.toThrow(InvalidBodyError)
  })

  it('should called InsuranceService.processTransaction', () => {
    const spyProcessTransaction = jest.spyOn(InsuranceService, 'processTransaction')

    const store = makeStore({
      app: {
        products: {
          TU_BAN_PRO: {
            code: 'TU_BAN_PRO',
            plans: {
              TU_BAN_PRO: {
                name: 'TU BAN PRO',
                paymentMethodOptions: {
                  MONTHLY: {
                    name: 'Mensual',
                    order: 1,
                    description: 'Mensual',
                  },
                },
                periodicityOptions: {
                  MONTHLY: {
                    name: 'Mensual',
                    description: 'Mensual',
                    factor: 1,
                    order: 1,
                    price: '3.99',
                    taxes: '0.8',
                    totalPrice: '4.79',
                  },
                },
                coverages: {},
              },
            },
          },
        },
        accounts: {
          '00x1': {
            hash: '00x1',
            mask: '*******3424',
            alias: 'PRINCIPAL',
            balance: 5467,
            type: 'SAVINGS_ACCOUNT',
            favorite: true,
            value: 'q5w6eq3weq4eq4w',
          },
        },
      },
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          key: 'test',
          transactionReference: 'test',
          accountHashSelected: '00x1',
          planSelected: 'TU_BAN_PRO',
          periodicitySelected: 'MONTHLY',
        },
      },
      global: {
        security: {
          authEvent: {
            channel: 'WEB',
            cif: '1718137154001',
            clientId: '1718137154001',
            clientIdType: '0001',
            deeplink: 'https://www.pichincha.com/',
            device: 'WEB',
            guid: '123456789',
            ip: '',
            os: 'ios',
            jwtToken: '123456789',
            screenWidth: '1920',
            session: '123456789',
            xsrf: '123456789',
          },
        },
      },
    })

    const { result } = renderHook(() => useAcceptance(), {
      wrapper: createWrapper(store),
    })

    act(() => {
      result.current('3434654')
    })

    expect(spyProcessTransaction).toBeCalledWith({
      key: 'test',
      transactionReference: 'test',
      acceptanceReference: '3434654',
      accountType: 'SAVINGS_ACCOUNT',
      accountValue: 'q5w6eq3weq4eq4w',
      identity: {
        cif: '1718137154001',
        dni: '1718137154001',
        dniType: '0001',
      },
      paymentMethodCode: 'MONTHLY',
      paymentPeriodicityCode: 'MONTHLY',
      planCode: 'TU_BAN_PRO',
      productCode: 'TU_BAN_PRO',
    })
  })
})
