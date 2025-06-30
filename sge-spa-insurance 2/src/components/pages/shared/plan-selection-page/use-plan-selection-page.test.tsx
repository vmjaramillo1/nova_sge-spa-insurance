import { renderHook } from '@testing-library/react'
import usePlanSelectionPage from './use-plan-selection-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

jest.mock('@app/utils/messages', () => ({
  __esModule: true,
  ...jest.requireActual('@app/utils/messages'),
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

    expect(result.current.content).toBeDefined()
    expect(result.current.benefitsCodes).toBeInstanceOf(Array)
    expect(result.current.planCodes).toBeInstanceOf(Array)
    expect(result.current.getIcon).toBeInstanceOf(Function)
    expect(typeof result.current.selectedPlan).toBe('string')
    expect(typeof result.current.ariaFooter).toBe('string')
    expect(result.current.handleChangePlan).toBeInstanceOf(Function)
    expect(result.current.handleNextPage).toBeInstanceOf(Function)
  })
})
