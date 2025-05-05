import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import ProductCard from './product-card'
import { APP_ROUTES } from '@app/routes/config'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('<ProductCard />', () => {
  const DATA = {
    title: {
      value: 'title test',
      aria: 'title-aria',
    },
    description: {
      value: 'description test',
      aria: 'description-aria',
    },
    paymentType: {
      value: 'paymentType test',
      aria: 'paymentType-aria',
    },
    price: {
      value: 'price test',
      aria: 'price-aria',
    },
    coverages: {
      title: 'Coverages Title',
      items: [
        {
          key: 'coverage-1',
          title: {
            value: 'Coverage Title 1',
            aria: 'coverage-title-1-aria',
          },
          description: {
            value: 'Coverage Description 1',
            aria: 'coverage-description-1-aria',
          },
        },
      ],
    },
    action: {
      urlTarget: APP_ROUTES.PRODUCT_DETAIL,
      value: 'Discover your insurance',
      aria: 'action-aria',
    },
  }

  const navigateMock = jest.fn()

  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)
  })

  it('should render title', () => {
    render(<ProductCard {...DATA} />)

    const title = screen.getByText('title test')

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    render(<ProductCard {...DATA} />)

    const description = screen.getByText('description test')

    expect(description).toBeInTheDocument()
  })

  it('should render price', () => {
    render(<ProductCard {...DATA} />)

    const paymentType = screen.getByText('paymentType test')
    const price = screen.getByText('price test')

    expect(paymentType).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('should render content', () => {
    render(<ProductCard {...DATA} />)

    const cardEl = screen.getByTestId('coverage-1')

    expect(cardEl).toBeInTheDocument()
  })

  it('should call navigate when clicking on the action button', () => {
    render(<ProductCard {...DATA} />)

    const actionButton = screen.getByRole('button')
    fireEvent.click(actionButton)

    expect(navigateMock).toHaveBeenCalledTimes(1)
  })

  it('should navigate to urlTarget', () => {
    render(<ProductCard {...DATA} />)

    const actionButton = screen.getByRole('button')
    fireEvent.click(actionButton)

    expect(navigateMock).toHaveBeenCalledWith(APP_ROUTES.PRODUCT_DETAIL)
  })
})
