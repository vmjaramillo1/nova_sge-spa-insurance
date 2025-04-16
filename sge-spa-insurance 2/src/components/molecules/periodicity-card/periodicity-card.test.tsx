import { act, render, screen } from '@testing-library/react'
import PeriodicityCard from './periodicity-card'

describe('<PeriodicityCard />', () => {
  it('should render', () => {
    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
        selected
      />
    )

    expect(
      screen.getByRole('button', { name: /Incluye impuestos/ })
    ).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const onClick = jest.fn()

    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={onClick}
        price="12.12"
        selected
      />
    )
    const button = screen.getByRole('button', { name: /Name/ })

    act(() => {
      button.click()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should render badge', () => {
    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
        selected
        badge="Badge"
      />
    )

    expect(screen.getByText(/Badge/)).toBeInTheDocument()
  })

  it('should render additional', () => {
    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
        selected
        additional="Additional"
      />
    )

    expect(screen.getByText(/Additional/)).toBeInTheDocument()
  })

  it('should render price', () => {
    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
        selected
      />
    )

    expect(screen.getByText(/12.12/)).toBeInTheDocument()
  })

  it('should render selected', () => {
    render(
      <PeriodicityCard
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
        selected
        data-testid="empty-card"
      />
    )

    expect(screen.getByTestId('empty-card-radio')).toBeInTheDocument()
  })
})
