import { render, screen } from '@testing-library/react'
import Banner from './banner'

describe('<Banner />', () => {
  it('should render Banner', () => {
    render(<Banner />)

    const bannerEl = screen.getByRole('banner', {
      hidden: true,
    })

    expect(bannerEl).toBeInTheDocument()
  })

  it('should render Banner with children', () => {
    render(<Banner>children</Banner>)

    const bannerEl = screen.getByText('children')

    expect(bannerEl).toBeInTheDocument()
  })

  it('should render Banner with primary variant', () => {
    render(<Banner variant="primary" />)

    const bannerEl = screen.getByRole('banner', {
      hidden: true,
    })

    expect(bannerEl).toHaveClass('banner--primary')
  })
})
