import { render, screen } from '@testing-library/react'
import CoverageRow from './coverage-row'

describe('<CoverageRow />', () => {
  it('should render', () => {
    render(<CoverageRow label="Label test" value="Value test" />)

    const labelEl = screen.getByText('Label test')
    const valueEl = screen.getByText('Value test')

    expect(labelEl).toBeInTheDocument()
    expect(valueEl).toBeInTheDocument()
  })

  it('should render with bolder', () => {
    render(<CoverageRow label="Label test" value="Value test" bolder />)

    const labelEl = screen.getByText('Label test')
    const valueEl = screen.getByText('Value test')

    expect(labelEl).toHaveClass('font-semibold')
    expect(valueEl).toHaveClass('font-semibold')
  })
})
