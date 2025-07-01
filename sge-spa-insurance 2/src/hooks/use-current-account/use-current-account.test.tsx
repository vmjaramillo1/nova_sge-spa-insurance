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

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

describe('useCurrentAccount', () => {
  it('should return null when no accounts', () => {
    const store = makeStore({
      app: {
        ...appValues,
        paymentOptions: {
          accounts: {},
          cards: {},
        },
      },
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toBeNull()
  })

  it('should return current account', () => {
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
                alias: null,
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
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toEqual({
      description: '221264****',
      alias: null,
      label: 'Cta. Ahorros',
      accountHash:
        '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
      amount: '20.00',
      type: 'Cuenta de AhorroTransaccional',
      mask: '221264****',
      paymentType: 'SAVINGS_ACCOUNT',
    })
  })

  it('should return alias in label', () => {
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
                alias: 'PRINCIPAL',
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
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toEqual({
      description: '221264****',
      alias: 'PRINCIPAL',
      label: 'PRINCIPAL',
      accountHash:
        '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
      amount: '20.00',
      type: 'Cuenta de AhorroTransaccional',
      mask: '221264****',
      paymentType: 'SAVINGS_ACCOUNT',
    })
  })

  it('should return null when accountHash not in accounts', () => {
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
            '72767676767637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d':
              {
                hash: '72767676767637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
                mask: '221264****',
                type: 'Cuenta de AhorroTransaccional',
                balance: '20.00',
                alias: 'PRINCIPAL',
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
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentAccount(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toBeNull()
  })
})
