import { render } from '@testing-library/react'
import TermsAndConditionPage from './terms-and-condition-page'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')
const useIntersectionObserverMock = useIntersectionObserver as jest.Mock

describe('<TermsAndConditionPage />', () => {
  beforeEach(() => {
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should render correctly', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { container } = render(<TermsAndConditionPage />, {
      wrapper: createWrapperStore(store),
    })

    expect(container).toMatchSnapshot()
  })
})
