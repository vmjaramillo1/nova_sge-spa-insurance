import { renderHook } from '@testing-library/react'
import useAlreadyPage from './use-not-business-rule-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

jest.mock('@app/utils/messages', () => ({
  __esModule: true,
  ...jest.requireActual('@app/utils/messages'),
}))

describe('useAlreadyPage', () => {
  it('should return defined', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useAlreadyPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.handleBack).toBeInstanceOf(Function)
  })
})
