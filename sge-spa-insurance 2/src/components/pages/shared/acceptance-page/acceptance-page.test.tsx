import { render } from '@testing-library/react'
import AcceptancePage from './acceptance-page'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<AcceptancePage />', () => {
  it('should render', () => {
    const { container } = render(<AcceptancePage />, { wrapper })

    expect(container).toMatchSnapshot()
  })
})
