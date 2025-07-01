import useCurrentPortal from './use-current-portal'
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

describe('useCurrentPortal', () => {
  it('should return portal values', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentPortal(), {
      wrapper: createWrapperStore(store),
    })

    expect(typeof result.current.productCode).toBe('string')
    expect(typeof result.current.isPending).toBe('boolean')
    expect(typeof result.current.currentPortal).toBe('object')
  })

  it('should return INVALID_PRODUCT', () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'INVALID_PRODUCT',
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

    const { result } = renderHook(() => useCurrentPortal(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.productCode).toBe('INVALID_PRODUCT')
    expect(result.current.currentPortal).toBeNull()
  })

  it('should return isPending true', () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: null,
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

    const { result } = renderHook(() => useCurrentPortal(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.isPending).toBe(true)
  })

  it('should return currentPortal type', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useCurrentPortal(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.currentPortal).toBeDefined()
    expect(result.current.currentPortal).toHaveProperty('content')
    expect(result.current.currentPortal).toHaveProperty('params')
    expect(result.current.currentPortal).toHaveProperty('code')
  })
})
