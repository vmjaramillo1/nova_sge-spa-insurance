import { render } from '@testing-library/react'
import PreviousPage from './previous-page'
import { createWrapper } from '@app/__test__/wrappers'

describe('<PreviousPage />', () => {
  it('should render', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: {
          os: 'android',
        } as never,
      },
    })

    const { baseElement } = render(<PreviousPage />, { wrapper })

    expect(baseElement).toMatchSnapshot()
  })
})
