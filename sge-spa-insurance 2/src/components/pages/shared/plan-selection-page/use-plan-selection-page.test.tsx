import { act, renderHook } from '@testing-library/react'
import usePlanSelectionPage from './use-plan-selection-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import { APP_ROUTES } from '@app/routes/config'
import React from 'react'

jest.mock('@pichincha/events-microsite')

const mockNavigate = jest.fn()

jest.mock('@app/utils/messages', () => ({
  __esModule: true,
  ...jest.requireActual('@app/utils/messages'),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('usePlanSelectionPage', () => {
  it('should return defined', () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'LIFE_HEALTH',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          planSelected: 'LIFE_HEALTH_3',
          periodicitySelected: 'MONTHLY',
          transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
          contentLoaded: true,
          step: 'PLAN_SELECTION',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePlanSelectionPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.content).toBeDefined()
    expect(result.current.benefitsCodes).toBeInstanceOf(Array)
    expect(result.current.planCodes).toBeInstanceOf(Array)
    expect(result.current.getIcon).toBeInstanceOf(Function)
    expect(typeof result.current.selectedPlan).toBe('string')
    expect(typeof result.current.ariaFooter).toBe('string')
    expect(result.current.handleChangePlan).toBeInstanceOf(Function)
    expect(result.current.handleNextPage).toBeInstanceOf(Function)
  })

  it('should navigate to product page', async () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'LIFE_HEALTH',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          planSelected: 'LIFE_HEALTH_3',
          periodicitySelected: 'MONTHLY',
          transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
          contentLoaded: true,
          step: 'PLAN_SELECTION',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePlanSelectionPage(), {
      wrapper: createWrapperStore(store),
    })

    await act(async () => {
      await result.current.handleNextPage()
    })

    expect(mockNavigate).toHaveBeenCalledWith(APP_ROUTES.PRODUCT_DETAIL)
  })

  it('should execute handleChangePlan', async () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'LIFE_HEALTH',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          planSelected: 'LIFE_HEALTH_3',
          periodicitySelected: 'MONTHLY',
          transactionReference: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
          contentLoaded: true,
          step: 'PLAN_SELECTION',
          status: 'WAIT_LOAD',
          contract: '',
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePlanSelectionPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.selectedPlan).toEqual('LIFE_HEALTH_3')

    await act(async () => {
      await result.current.handleChangePlan('LIFE_HEALTH_2')
    })

    expect(result.current.selectedPlan).toEqual('LIFE_HEALTH_2')
  })

  it('should return the correct icons', () => {
    const store = makeStore({
      app: appValues,
      flow: {
        ...flowValues,
        shared: {
          productCode: 'LIFE_HEALTH',
          accountHashSelected:
            '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
          planSelected: 'LIFE_HEALTH_3',
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

    const { result } = renderHook(() => usePlanSelectionPage(), {
      wrapper: createWrapperStore(store),
    })

    const iconSuccess = result.current.getIcon('success')
    const iconError = result.current.getIcon('close')

    expect(React.isValidElement(iconSuccess)).toBe(true)
    expect(React.isValidElement(iconError)).toBe(true)
  })
})
