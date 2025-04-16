import { render, screen } from '@testing-library/react'
import ButtonIconLoading from './button-icon-loading'

describe('<ButtonIconLoading />', () => {
  it('should render', () => {
    render(<ButtonIconLoading />)

    const buttonIconLoadingEl = screen.getByRole('img')

    expect(buttonIconLoadingEl).toBeInTheDocument()
  })

  it('should render with complementary color', () => {
    render(<ButtonIconLoading color="complementary" />)

    const buttonIconLoadingEl = screen.getByRole('img')

    expect(buttonIconLoadingEl).toHaveAttribute('color', 'rgba(255, 255, 255, 0.1)')
    expect(buttonIconLoadingEl).toHaveAttribute('background', '#ffffff')
  })
})
