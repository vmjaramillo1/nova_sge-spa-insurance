import { render } from '@testing-library/react'
import AlreadyPage from './not-business-rule-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

describe('<AlreadyPage />', () => {
  it('should render', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { container } = render(<AlreadyPage />, {
      wrapper: createWrapperStore(store),
    })
    expect(container).toMatchSnapshot()
  })
})
