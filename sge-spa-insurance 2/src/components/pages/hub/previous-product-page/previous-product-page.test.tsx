import { render } from '@testing-library/react'
import PreviousProductPage from './previous-product-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

describe('<PreviousProductPage />', () => {
  it('should render', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const wrapper = createWrapperStore(store)

    const { baseElement } = render(<PreviousProductPage />, { wrapper })

    expect(baseElement).toMatchSnapshot()
  })
})
