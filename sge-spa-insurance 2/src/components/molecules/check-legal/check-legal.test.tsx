import { render, screen } from '@testing-library/react'
import CheckLegal from './check-legal'

describe('<CheckLegal />', () => {
  it('should render', () => {
    render(<CheckLegal>Content</CheckLegal>)

    const checkEl = screen.getByText('Content')

    expect(checkEl).toBeInTheDocument()
  })
})
