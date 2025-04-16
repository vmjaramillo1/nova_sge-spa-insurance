import { render, screen } from '@testing-library/react'
import Radio from './radio'

describe('<Radio />', () => {
  it('should render', () => {
    render(<Radio checked data-testid="radio" />)

    expect(screen.getByTestId('radio')).toBeInTheDocument()
  })

  it('should render checked', () => {
    const { baseElement } = render(<Radio checked />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should render unchecked', () => {
    const { baseElement } = render(<Radio checked={false} />)

    expect(baseElement).toMatchSnapshot()
  })
})
