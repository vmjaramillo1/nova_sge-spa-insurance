import { renderHook } from '@testing-library/react'
import useSuccessPage from './use-success-page'
// import { createWrapper } from '@app/__test__/wrappers'

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

describe('useSuccessPage', () => {
  // it('should be defined', () => {
  //   const store = makeStore({
  //     flow: {
  //       shared: {
  //         planSelected: 'plan1',
  //         periodicitySelected: 'monthly',
  //       },
  //     },
  //     app: {
  //       products: {
  //         TU_BAN_PRO: {
  //           code: 'TU_BAN_PRO',
  //           plans: {
  //             TU_BAN_PRO: {
  //               name: 'TU BAN PRO',
  //               portal: {
  //                 success: {
  //                   details: [],
  //                   moreInformation: {
  //                     action: {
  //                       link: '',
  //                     },
  //                   },
  //                 },
  //               },
  //               paymentMethodOptions: {
  //                 MONTHLY: {
  //                   name: 'Mensual',
  //                   order: 1,
  //                   description: 'Mensual',
  //                 },
  //               },
  //               periodicityOptions: {
  //                 MONTHLY: {
  //                   name: 'Mensual',
  //                   description: 'Mensual',
  //                   factor: 1,
  //                   order: 1,
  //                   price: '3.99',
  //                   taxes: '0.8',
  //                   totalPrice: '4.79',
  //                 },
  //               },
  //               coverages: {},
  //             },
  //           },
  //         },
  //       },
  //     },
  //   })

  //   const outletValues = {
  //     outletValues: {
  //       isLoading: false,
  //       changeTitle: jest.fn(),
  //     },
  //   }

  //   const { result } = renderHook(() => useSuccessPage(), {
  //     wrapper: createWrapper({store, ...outletValues}),
  //   })

  //   expect(result.current.handleDownloadUserGuide).toBeInstanceOf(Function)
  //   expect(result.current.handleClickCall).toBeInstanceOf(Function)
  //   expect(result.current.content).toBeDefined()
  // })

  it('should return content', () => {
    const store = makeStore({
      flow: {
        shared: {
          planSelected: 'plan1',
          periodicitySelected: 'monthly',
        },
      },
      app: {
        products: {
          TU_BAN_PRO: {
            code: 'TU_BAN_PRO',
            plans: {
              TU_BAN_PRO: {
                name: 'TU BAN PRO',
                portal: {
                  success: {
                    title: 'title',
                    description: 'description',
                    button: 'button',
                    details: [],
                    moreInformation: {
                      action: {
                        link: '',
                      },
                    },
                  },
                },
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
    })

    const { result } = renderHook(() => useSuccessPage(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.content).toEqual({
      title: 'title',
      description: 'description',
      button: 'button',
      details: [],
      moreInformation: {
        action: {
          link: '',
        },
      },
    })
  })
})
