import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import useInsurancePage from './use-insurance-page'
import { renderHook } from '@testing-library/react'

jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')
const useIntersectionObserverMock = useIntersectionObserver as jest.Mock

describe('useAlreadyPage', () => {
  beforeEach(() => {
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should render correctly', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useInsurancePage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.heroContent).toBeDefined()
    expect(result.current.productCards).toBeDefined()
  })
})
