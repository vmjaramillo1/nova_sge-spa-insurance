import { render, screen } from '@testing-library/react'
import Skeleton from './skeleton'

describe('<Skeleton />', () => {
  it('should be render', () => {
    const { baseElement } = render(<Skeleton />)

    expect(baseElement).toBeInTheDocument()
  })

  it('should be render with width', () => {
    render(<Skeleton width="100px" />)

    const skeletonEl = screen.getByRole('presentation', {
      hidden: true,
    })

    expect(skeletonEl).toHaveStyleRule('width', '100px')
  })

  it('should be render animate', () => {
    let animate = false

    const result = render(<Skeleton animate={animate} />)

    const skeletonEl = screen.getByRole('presentation', {
      hidden: true,
    })
    expect(skeletonEl).toHaveStyleRule('animation', 'none')

    animate = true

    result.rerender(<Skeleton animate={animate} />)

    expect(skeletonEl).toHaveStyleRule(
      'animation',
      'skeleton-loading 1.5s ease-in-out infinite'
    )
  })
})
