import { renderHook } from '@testing-library/react'
import useCurrentAccount from './use-current-account'
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

describe('useCurrentAccount', () => {
  it('should return null when no accounts', () => {
    const store = makeStore()

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toBeNull()
  })

  it('should return current account', () => {
    const store = makeStore({
      app: {
        accounts: {
          '0x002351234': {
            hash: '0x002351234',
            mask: '22XXXX54',
            type: 'SAVINGS_ACCOUNT',
            balance: 300,
            alias: 'PRINCIPAL',
            favorite: true,
            value: '232423423412e312ae3e123',
          },
          '0x01': {
            hash: '0x01',
            mask: '12XXXX12',
            type: 'CHECKING_ACCOUNT',
            balance: 800,
            alias: null,
            favorite: false,
            value: '232423423412e312ae3e134234254aea254ae3',
          },
        },
      },
      flow: {
        shared: {
          accountHashSelected: '0x01',
        },
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toEqual({
      description: '12XXXX12',
      alias: null,
      label: 'Corriente',
      accountHash: '0x01',
      amount: 800,
      type: 'CHECKING_ACCOUNT',
      value: '232423423412e312ae3e134234254aea254ae3',
      mask: '12XXXX12',
    })
  })

  it('should return alias in label', () => {
    const store = makeStore({
      app: {
        accounts: {
          '0x00': {
            hash: '0x00',
            mask: '27XXXX57',
            type: 'SAVINGS_ACCOUNT',
            balance: 2000,
            alias: 'PRINCIPAL',
            favorite: true,
            value: '525a356sd2a5642',
          },
          '0x01': {
            hash: '0x01',
            mask: '22XXXX22',
            type: 'SAVINGS_ACCOUNT',
            balance: 400,
            alias: 'OTHER',
            favorite: false,
            value: '65a3sd6a5sd36a5sd',
          },
          '0x01234sf2': {
            hash: '0x01234sf2',
            mask: '23XXXX29',
            type: 'CHECKING_ACCOUNT',
            balance: 150,
            alias: null,
            favorite: false,
            value: 'as7d865as78d6a8s7d',
          },
        },
      },
      flow: {
        shared: {
          accountHashSelected: '0x00',
        },
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toEqual({
      accountHash: '0x00',
      description: '27XXXX57',
      alias: 'PRINCIPAL',
      type: 'SAVINGS_ACCOUNT',
      amount: 2000,
      label: 'PRINCIPAL',
      value: '525a356sd2a5642',
      mask: '27XXXX57',
    })
  })

  it('should return null when accountHash not in accounts', () => {
    const store = makeStore({
      app: {
        accounts: {
          '0x02342e41a0': {
            hash: '0x02342e41a0',
            mask: '53XXXX57',
            type: 'SAVINGS_ACCOUNT',
            balance: 350,
            alias: 'PRINCIPAL',
            favorite: true,
            value: 'asd647a7sda4sd7',
          },
          '0x01': {
            hash: '0x01',
            mask: '12XXXX12',
            type: 'CHECKING_ACCOUNT',
            balance: 7000,
            alias: null,
            favorite: true,
            value: 'asd87a6s73d6a5s5d89as',
          },
        },
      },
      flow: {
        shared: {
          accountHashSelected: 'RANDOM',
        },
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toBeNull()
  })
})
