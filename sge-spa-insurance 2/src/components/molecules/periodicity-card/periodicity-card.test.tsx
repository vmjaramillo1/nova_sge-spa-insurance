import { act, render, screen } from '@testing-library/react'
import PeriodicityCard from './periodicity-card'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<PeriodicityCard />', () => {
  it('should render', () => {
    render(
      <PeriodicityCard
        selected
        name="Name"
        value="1"
        onClick={jest.fn()}
        price="12.12"
      />,
      {
        wrapper: wrapper,
      }
    )

    expect(screen.getByText('Incluye impuestos')).toBeInTheDocument()
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
      />,
      {
        wrapper: wrapper,
      }
    )
    const button = screen.getByText('Name')

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
      />,
      {
        wrapper: wrapper,
      }
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
      />,
      {
        wrapper: wrapper,
      }
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
      />,
      {
        wrapper: wrapper,
      }
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
      />,
      {
        wrapper: wrapper,
      }
    )

    expect(screen.getByTestId('empty-card-radio')).toBeInTheDocument()
  })
})
