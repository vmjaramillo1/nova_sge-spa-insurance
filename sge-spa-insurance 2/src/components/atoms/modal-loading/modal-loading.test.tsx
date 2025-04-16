import { render, screen } from '@testing-library/react'
import ModalLoading from './modal-loading'

describe('<ModalLoading />', () => {
  it('should render the component', () => {
    const { container } = render(<ModalLoading />)

    expect(container).toMatchSnapshot()
  })

  it('should render the component with children', () => {
    render(
      <ModalLoading>
        <span>Test</span>
      </ModalLoading>
    )

    const child = screen.getByText('Test')

    expect(child).toBeInTheDocument()
  })
})
