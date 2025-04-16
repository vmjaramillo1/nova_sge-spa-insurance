import { render, screen } from '@testing-library/react'
import Divider from './divider'

describe('<Divider />', () => {
  it('should render base', () => {
    const { baseElement } = render(<Divider />)
    expect(baseElement).toBeInTheDocument()
  })

  it('should render with className', () => {
    const className = 'test-class-name'
    render(<Divider className={className} dataTestId="divider" />)
    const dividerEl = screen.getByTestId('divider')
    expect(dividerEl).toHaveClass(className)
  })

  it('should render vertical', () => {
    render(<Divider vertical dataTestId="divider" />)
    const dividerEl = screen.getByTestId('divider')
    expect(dividerEl).toHaveClass('divider--vertical')
  })
})
