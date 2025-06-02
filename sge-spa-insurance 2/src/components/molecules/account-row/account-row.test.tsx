import { fireEvent, render, screen } from '@testing-library/react'
import AccountCard from './account-row'
import { act } from 'react-dom/test-utils'

describe('<AccountCard />', () => {
  it('should be render', () => {
    render(
      <AccountCard
        value="3123123123"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
      />
    )

    const accountCardLabelEl = screen.getByText('My custom label')
    const accountCardDescriptionEl = screen.getByText('My custom description')
    const accountCardValueEl = screen.getByText('My custom value')
    const actionableEl = screen.queryByText('Desde')

    expect(accountCardLabelEl).toBeInTheDocument()
    expect(accountCardDescriptionEl).toBeInTheDocument()
    expect(accountCardValueEl).toBeInTheDocument()
    expect(actionableEl).toBeNull()
  })

  it('should be show actionable content', () => {
    render(
      <AccountCard
        value="3451252354"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        // actionable
      />
    )

    const actionableContentEl = screen.getByTestId('account-arrow')
    expect(actionableContentEl).toBeInTheDocument()
  })

  it('should be show selected style', () => {
    render(
      <AccountCard
        value="3451252354"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        selected
      />
    )

    const accountCardEl = screen.getByRole('button')
    expect(accountCardEl).toHaveClass('account-card--selected')
  })

  it('should be call onClick', () => {
    const onClick = jest.fn()
    render(
      <AccountCard
        value="4574658345t234"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        onClick={onClick}
      />
    )

    const accountCardEl = screen.getByRole('button')

    act(() => {
      fireEvent.click(accountCardEl)
    })

    expect(onClick).toHaveBeenCalled()
  })
})
