import { render, screen } from '@testing-library/react'
import SuccessPage from './success-page'
// import { createWrapper } from '@app/__test__/wrappers'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

describe('<SuccessPage />', () => {
  const store = makeStore({
    app: appValues,
    flow: flowValues,
    global: globalValues,
  })

  const wrapper = createWrapperStore(store)

  it('should render', () => {
    const { baseElement } = render(<SuccessPage />, { wrapper })
    expect(baseElement).toMatchSnapshot()
  })
})
